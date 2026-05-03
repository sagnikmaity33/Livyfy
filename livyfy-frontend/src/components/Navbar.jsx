import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Livyfy
        </h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white smooth">
            Home
          </Link>
          <Link to="/explore" className="hover:text-white smooth">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;