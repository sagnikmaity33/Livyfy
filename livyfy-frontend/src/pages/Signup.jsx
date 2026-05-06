import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../api/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      await signupUser(form);

      alert("Signup successful!");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">

      <div className="absolute top-20 right-20 text-8xl opacity-10 animate-bounce">
        🏡
      </div>

      <div className="absolute bottom-20 left-20 text-7xl opacity-10 animate-pulse">
        ✨
      </div>

      <div className="glass w-full max-w-md p-8 rounded-3xl relative z-10">

        <p className="text-yellow-300 text-sm">
          Join Livyfy
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Create Account
        </h1>

        <p className="text-gray-400 mt-3 text-sm">
          Start exploring AI-ranked verified stays.
        </p>

        <div className="space-y-4 mt-8">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-2xl outline-none"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
          </select>

          <button
            onClick={handleSignup}
            className="gold-btn w-full py-3 rounded-2xl smooth"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;