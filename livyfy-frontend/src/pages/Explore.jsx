import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { getListings } from "../api/api";

function Explore() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings().then((res) => {
      setListings(res.data.data);
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}

export default Explore;