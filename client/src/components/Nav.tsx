import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/houses', label: 'Houses' },
    { path: '/auction', label: 'Auction House' },
  ]

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-lg tracking-wide">MO2 Guild</span>
      <div className="flex gap-6">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm hover:text-amber-400 transition-colors ${
              location.pathname === link.path ? 'text-amber-400 font-medium' : 'text-gray-300'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <span className="text-sm text-gray-400">Mitchell</span>
    </nav>
  )
}