import Nav from '../components/Nav'

export default function Houses() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Houses</h1>
            <p className="text-gray-400">Track your upkeep timers</p>
          </div>
          <button className="bg-amber-500 hover:bg-amber-400 text-black font-medium px-4 py-2 rounded-lg transition-colors">
            Add house
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400">
          No houses tracked yet. Add one to get started.
        </div>
      </div>
    </div>
  )
}
