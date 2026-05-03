import Nav from '../components/Nav'

export default function Auction() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Auction House</h1>
            <p className="text-gray-400">Buy and sell with guild members</p>
          </div>
          <button className="bg-amber-500 hover:bg-amber-400 text-black font-medium px-4 py-2 rounded-lg transition-colors">
            Post listing
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400">
          No active auctions. Be the first to post a listing.
        </div>
      </div>
    </div>
  )
}