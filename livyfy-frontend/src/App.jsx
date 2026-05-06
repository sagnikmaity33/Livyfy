import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ListingDetails from "./pages/ListingDetails";
import MyBookings from "./pages/MyBookings";
import Chatbot from "./pages/chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;