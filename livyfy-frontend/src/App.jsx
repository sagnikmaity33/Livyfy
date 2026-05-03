import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/ListingDetails";
import AiResults from "./pages/AiResults";
import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/listings:id" element={<Listings />} />
        <Route path="/ai" element={<AiResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;