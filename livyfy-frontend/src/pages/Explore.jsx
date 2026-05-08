

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getListings, hybridSearch } from "../api/api";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Explore() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("query") || "";

  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);

  const [filters, setFilters] = useState({
    query: urlQuery,
    price: "",
    location: "",
    verified: false,
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ALL LISTINGS
  // =========================
  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await getListings();

      console.log("Listings Response:", res.data);

      const content =
        res.data?.data?.content ||
        res.data?.data ||
        [];

      setListings(content);
      setAllListings(content);

    } catch (err) {
      console.error(err);
      setListings([]);
      setAllListings([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // AUTO SEARCH FROM URL
  // =========================
  const handleInitialSearch = async (searchQuery) => {
    try {
      setLoading(true);

      const payload = {
        query: searchQuery,
        location: null,
        maxPrice: null,
        verified: null,
      };

      console.log("Initial Search Payload:", payload);

      const res = await hybridSearch(payload);

      console.log("Initial Search Response:", res.data);

      const results =
        res.data?.data?.content ||
        res.data?.data ||
        [];

      setListings(results);

    } catch (err) {
      console.error(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER SEARCH
  // =========================
  const applyFilters = async () => {
    try {

      const noFilters =
        !filters.query &&
        !filters.price &&
        !filters.location &&
        !filters.verified;

      // SHOW ALL LISTINGS
      if (noFilters) {
        setListings(allListings);
        return;
      }

      setLoading(true);

      const payload = {
        query: filters.query || null,
        location: filters.location || null,
        maxPrice: filters.price
          ? parseInt(filters.price)
          : null,
        verified: filters.verified || null,
      };

      console.log("Hybrid Payload:", payload);

      const res = await hybridSearch(payload);

      console.log("Hybrid Search Response:", res.data);

      const results =
        res.data?.data?.content ||
        res.data?.data ||
        [];

      setListings(results);

    } catch (err) {
      console.error(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PAGE LOAD
  // =========================
  useEffect(() => {

    // IF SEARCH QUERY EXISTS
    if (urlQuery) {

      setFilters((prev) => ({
        ...prev,
        query: urlQuery,
      }));

      handleInitialSearch(urlQuery);

    } else {

      // OTHERWISE LOAD ALL
      fetchListings();
    }

  }, [urlQuery]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* FILTER BAR */}
        <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] p-5 mb-8 shadow-xl">

          {/* TOP BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">
              🛏 PG / Hostels
            </button>

            <button className="bg-black border border-yellow-400/20 px-6 py-3 rounded-full text-gray-300">
              🏢 Flats
            </button>

            <button className="bg-black border border-yellow-400/20 px-6 py-3 rounded-full text-gray-300">
              🎓 Students
            </button>

            <button className="bg-black border border-yellow-400/20 px-6 py-3 rounded-full text-gray-300">
              🔐 Verified
            </button>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search PG..."
              value={filters.query}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  query: e.target.value,
                })
              }
              className="bg-black border border-yellow-400/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  location: e.target.value,
                })
              }
              className="bg-black border border-yellow-400/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={filters.price}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  price: e.target.value,
                })
              }
              className="bg-black border border-yellow-400/20 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              onClick={applyFilters}
              className="bg-yellow-400 text-black rounded-2xl font-bold hover:bg-yellow-300 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-yellow-400 font-semibold">
              AI-ranked property suggestions
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {listings.length} PGs available
            </h1>

            <p className="text-gray-400 mt-2">
              Verified student housing listings
            </p>
          </div>

          <button
            onClick={fetchListings}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Refresh
          </button>
        </div>

        {/* LISTINGS */}
        <section className="space-y-6">

          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loading && listings.length === 0 && (
            <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] p-10 text-center">
              <div className="text-6xl mb-4">🏠</div>

              <h2 className="text-3xl font-bold">
                No listings found
              </h2>

              <p className="text-gray-400 mt-3">
                Try another search query
              </p>
            </div>
          )}

          {!loading &&
            listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/listing/${listing.id}`)}
                className="grid md:grid-cols-[300px_1fr] bg-[#111] border border-yellow-400/20 rounded-[32px] overflow-hidden shadow-xl hover:scale-[1.01] transition cursor-pointer"
              >

                {/* IMAGE */}
                <div className="relative h-64 md:h-full">
                  <img
                    src={
                      listing.imageUrl ||
                      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-7">

                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {listing.title}
                      </h2>

                      <p className="text-gray-400 mt-1">
                        📍 {listing.location}
                      </p>
                    </div>

                    <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 px-4 py-2 rounded-full text-sm h-fit">
                      {listing.verified
                        ? "✔ Verified"
                        : "Pending"}
                    </span>
                  </div>

                  <p className="text-gray-400 mt-5">
                    {listing.description}
                  </p>

                  <div className="flex items-end justify-between mt-8">

                    <div>
                      <p className="text-gray-400 text-sm">
                        Starts from
                      </p>

                      <p className="text-3xl font-bold text-yellow-400">
                        ₹{listing.price}
                        <span className="text-sm text-gray-400">
                          /mo
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/listing/${listing.id}`);
                      }}
                      className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-yellow-300 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="grid md:grid-cols-[300px_1fr] bg-[#111] border border-yellow-400/20 rounded-[32px] overflow-hidden animate-pulse">
      <div className="h-64 bg-yellow-400/10" />

      <div className="p-7 space-y-5">
        <div className="h-8 bg-yellow-400/10 rounded-xl w-2/3" />
        <div className="h-4 bg-yellow-400/10 rounded-xl w-1/3" />
        <div className="h-10 bg-yellow-400/10 rounded-xl w-full" />
        <div className="h-14 bg-yellow-400/10 rounded-xl w-1/2" />
      </div>
    </div>
  );
}

export default Explore;