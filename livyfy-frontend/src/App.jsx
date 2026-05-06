import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ListingDetails from "./pages/ListingDetails";

import Chatbot from "./pages/Chatbot";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* EXPLORE */}
        <Route path="/explore" element={<Explore />} />

        {/* LISTING DETAILS */}
        <Route path="/listing/:id" element={<ListingDetails />} />

        /

        {/* AI CHAT */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* OWNER */}
        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;