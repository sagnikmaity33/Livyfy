import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gold-btn flex items-center justify-center">
            🏠
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Livyfy</h1>
        </Link>

        <div className="flex gap-5 items-center text-sm">

        <div className="flex gap-5 items-center text-sm">
  
       <Link to="/" className="text-gray-300 hover:text-yellow-300 smooth">
        Home
        </Link>

       <Link to="/chatbot" className="text-gray-300 hover:text-yellow-300 smooth">
        AI Chat
        </Link>

        <Link to="/my-bookings" className="text-gray-300 hover:text-yellow-300 smooth">
        My Bookings
        </Link>

        <Link to="/owner/bookings" className="text-gray-300 hover:text-yellow-300 smooth">
        Owner Panel
        </Link>

        <Link to="/explore" className="gold-btn px-5 py-2 rounded-full smooth">
        Explore
        </Link>

</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;