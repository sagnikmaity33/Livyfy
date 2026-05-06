import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser(form);

      const data = res.data.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      alert("Login successful!");

      // ROLE-BASED NAVIGATION
      if (data.role === "OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">

      {/* Floating animations */}
      <div className="absolute top-20 left-20 text-8xl opacity-10 animate-bounce">
        🏠
      </div>

      <div className="absolute bottom-20 right-20 text-7xl opacity-10 animate-pulse">
        ✨
      </div>

      {/* Login Card */}
      <div className="glass w-full max-w-md p-8 rounded-3xl relative z-10">

        <p className="text-yellow-300 text-sm">
          Welcome back to Livyfy
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Login
        </h1>

        <p className="text-gray-400 mt-3 text-sm">
          Access AI-powered verified housing search.
        </p>

        <div className="space-y-4 mt-8">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="gold-btn w-full py-3 rounded-2xl smooth"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* Signup Link */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-300">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;