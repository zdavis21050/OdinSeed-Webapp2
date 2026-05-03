import Nav from '../components/Nav'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-8">Here's what's happening in the guild.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Houses tracked</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">On timer soon</p>
            <p className="text-3xl font-bold text-amber-400">0</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Active auctions</p>
            <p className="text-3xl font-bold text-emerald-400">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">Houses expiring soon</h2>
            <p className="text-gray-400 text-sm">No houses tracked yet.</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">Recent auctions</h2>
            <p className="text-gray-400 text-sm">No active auctions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}