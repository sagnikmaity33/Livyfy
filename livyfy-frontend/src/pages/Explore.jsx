import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import FilterBar from "../components/FilterBar";
import { getListings, hybridSearch } from "../api/api";

function Explore() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    verified: false,
  });

  const fetchListings = async () => {
    try {
      const res = await getListings();
      setListings(res.data.data || []);
    } catch (err) {
      console.error(err);
      setListings([]);
    }
  };

  const applyFilters = async () => {
    try {
      const res = await hybridSearch({
        maxPrice: filters.price,
        location: filters.location,
        verified: filters.verified,
      });
      setListings(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <p className="text-yellow-300 text-sm">Explore verified stays</p>
          <h2 className="text-3xl font-bold mt-1">
            Discover student-friendly PGs
          </h2>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onApply={applyFilters}
        />

        {listings.length === 0 && (
          <div className="glass p-6 rounded-3xl text-gray-400 text-center">
            No listings found. Start backend or try another filter.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;