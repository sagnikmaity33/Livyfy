import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gold-btn flex items-center justify-center">
            🏠
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Livyfy
          </h1>
        </Link>

        {/* Menu */}
        <div className="flex gap-5 items-center text-sm flex-wrap justify-end">

          <Link
            to="/"
            className="text-gray-300 hover:text-yellow-300 smooth"
          >
            Home
          </Link>

          <Link
            to="/chatbot"
            className="text-gray-300 hover:text-yellow-300 smooth"
          >
            AI Chat
          </Link>

          <Link
            to="/explore"
            className="text-gray-300 hover:text-yellow-300 smooth"
          >
            Explore
          </Link>

          {/* USER */}
          {role === "USER" && (
            <Link
              to="/my-bookings"
              className="text-gray-300 hover:text-yellow-300 smooth"
            >
              My Bookings
            </Link>
          )}

          {/* OWNER */}
          {role === "OWNER" && (
            <Link
              to="/owner/dashboard"
              className="text-gray-300 hover:text-yellow-300 smooth"
            >
              Owner Dashboard
            </Link>
          )}

          {/* NOT LOGGED IN */}
          {!role && (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-yellow-300 smooth"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="gold-btn px-5 py-2 rounded-full smooth"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* LOGOUT */}
          {role && (
            <button
              onClick={handleLogout}
              className="bg-red-500/20 border border-red-400/20 text-red-300 px-5 py-2 rounded-full hover:bg-red-500/30 smooth"
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