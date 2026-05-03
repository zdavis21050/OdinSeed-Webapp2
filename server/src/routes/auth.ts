import { Router, Request, Response } from 'express'
import { pool } from '../db'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    const id = randomUUID()
    await pool.query(
      'INSERT INTO users (id, hashed_password, username) VALUES ($1, $2, $3)',
      [id, hashed, username]
    )
    res.json({ ok: true })
  } catch (err: any) {
    res.status(400).json({ error: 'Username already taken' })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    const user = rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid username or password' })

    const valid = await bcrypt.compare(password, user.hashed_password)
    if (!valid) return res.status(401).json({ error: 'Invalid username or password' })

    const sessionId = randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await pool.query(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)',
      [sessionId, user.id, expiresAt]
    )

    res.cookie('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt
    })

    res.json({ ok: true, user: { id: user.id, username: user.username, role: user.role } })
  } catch (err: any) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

router.post('/logout', async (req: Request, res: Response) => {
  const sessionId = req.cookies?.session
  if (sessionId) {
    await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId])
  }
  res.clearCookie('session')
  res.json({ ok: true })
})

router.get('/me', async (req: Request, res: Response) => {
  const sessionId = req.cookies?.session
  if (!sessionId) return res.status(401).json({ error: 'Not logged in' })

  const { rows } = await pool.query(
    'SELECT users.* FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.id = $1 AND sessions.expires_at > NOW()',
    [sessionId]
  )
  const user = rows[0]
  if (!user) return res.status(401).json({ error: 'Session expired' })

  res.json({ user: { id: user.id, username: user.username, role: user.role } })
})

export default router