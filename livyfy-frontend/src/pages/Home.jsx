import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import { getListings } from "../api/api";

function Home() {
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  // 🏠 FETCH LISTINGS FOR HOME PREVIEW
useEffect(() => {
  setLoading(true);

  getListings()
    .then((res) => {
      // console.log("Listings API response:", res.data); // 👈 debug

      // ✅ FIX HERE
      setListings(res.data.data?.content || []);
    })
    .catch((err) => {
      console.error(err);
      setListings([]);
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex glass px-4 py-2 rounded-full text-sm text-yellow-300 mb-6">
            ✨ AI-powered campus housing search
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Find your next stay <br />
            <span className="gold-text">trusted & verified</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Discover verified PGs with AI-powered ranking and smart filtering.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchBar
              value={query}
              setValue={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* LISTINGS PREVIEW */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            🏠 Available Stays
          </h2>

          <button
            onClick={() => navigate("/search?query=pg")}
            className="text-sm text-blue-400 hover:underline"
          >
            View all →
          </button>
        </div>

        {loading ? (
          <div className="glass p-6 rounded-2xl text-center">
            <p className="text-gray-400">Loading listings...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {listings.slice(0, 6).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;