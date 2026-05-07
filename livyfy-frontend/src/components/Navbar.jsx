import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-black border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-yellow-400 flex items-center justify-center text-xl">
            🏠
          </div>
          <h1 className="text-3xl font-bold text-white">Livyfy</h1>
        </Link>

        <div className="flex gap-5 items-center text-base font-medium">
          <Link to="/" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
            Home
          </Link>

          <Link to="/chatbot" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
            AI Chat
          </Link>

          <Link to="/explore" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
            Explore
          </Link>

          {role === "USER" && (
            <Link to="/my-bookings" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
              My Bookings
            </Link>
          )}

          {role === "OWNER" && (
            <Link to="/owner/dashboard" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
              Owner Dashboard
            </Link>
          )}

          {!role && (
            <>
              <Link to="/login" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
                Login
              </Link>

              <Link to="/signup" className="bg-yellow-400 text-black px-5 py-2 rounded-full">
                Sign Up
              </Link>
            </>
          )}

          {role && (
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;