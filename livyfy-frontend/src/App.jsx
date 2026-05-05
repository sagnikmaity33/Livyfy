import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ListingDetails from "./pages/ListingDetails";
import AiResults from "./pages/AiResults";
import Chatbot from "./pages/Chatbot";
import MyBookings from "./pages/MyBookings";
import OwnerBookings from "./pages/OwnerBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/ai" element={<AiResults />} />
        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;