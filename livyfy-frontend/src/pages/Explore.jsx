import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import { getListings, hybridSearch } from "../api/api";
import { useNavigate } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    verified: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await getListings();
      setListings(res.data.data.content || []);
    } catch (err) {
      console.error(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const res = await hybridSearch({
        maxPrice: filters.price,
        location: filters.location,
        verified: filters.verified,
      });
      setListings(res.data.data.content || []);
    } catch (err) {
      console.error(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* FILTER BAR */}
        <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] p-5 mb-8 shadow-xl">
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

          <FilterBar
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
          />
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-yellow-400 font-semibold">
              AI-ranked property suggestions
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {listings.length} PGs available for students
            </h1>

            <p className="text-gray-400 mt-2">
              Automatically fetched from backend listings and ranked by filters.
            </p>
          </div>

          <button
            onClick={fetchListings}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Refresh
          </button>
        </div>

        <section className="grid lg:grid-cols-[2fr_1fr] gap-8">

          {/* LEFT LISTINGS */}
          <div className="space-y-6">
            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {!loading && listings.length === 0 && (
              <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] p-10 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h2 className="text-3xl font-bold">No listings found</h2>
                <p className="text-gray-400 mt-3">
                  Start backend, create listings, or try another filter.
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
                  <div className="relative h-64 md:h-full">
                    <img
                      src={
                        listing.imageUrl ||
                        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=900&q=80"
                      }
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                      Preferred by Students
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-yellow-300 px-4 py-3 font-semibold">
                      🏃 People moving in soon
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold">
                          {listing.title}
                        </h2>

                        <p className="text-gray-400 mt-1">
                          PG in {listing.location}
                        </p>
                      </div>

                      <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 px-4 py-2 rounded-full text-sm h-fit">
                        {listing.verified ? "✔ Verified" : "Pending"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <Amenity text={listing.amenities || "wifi, food, safety"} />
                      <Amenity text="Owner approval" />
                      <Amenity text="AI suggested" />
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5 text-sm">
                      <RoomChip text="Single" />
                      <RoomChip text="Double" />
                      <RoomChip text="Triple" />
                    </div>

                    <div className="flex items-end justify-between mt-8">
                      <div>
                        <p className="text-gray-400 text-sm">
                          Starts from
                        </p>
                        <p className="text-3xl font-bold text-yellow-400">
                          ₹{listing.price}
                          <span className="text-sm text-gray-400">/mo*</span>
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/listing/${listing.id}`);
                          }}
                          className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-yellow-300 transition"
                        >
                          View Details
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/listing/${listing.id}`);
                          }}
                          className="border border-yellow-400/30 text-yellow-300 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-400/10 transition"
                        >
                          Request Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* RIGHT MAP / SUGGESTION PANEL */}
          <aside className="hidden lg:block sticky top-28 h-fit">
            <div className="bg-[#111] border border-yellow-400/20 rounded-[32px] overflow-hidden shadow-xl">
              <div className="relative h-[520px] bg-gradient-to-br from-yellow-400/20 to-black flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80"
                  alt="map"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 bg-black/80 border border-yellow-400/20 rounded-3xl p-6 w-72">
                  <p className="text-yellow-400 font-semibold">
                    Nearby Suggestion
                  </p>

                  <h3 className="text-2xl font-bold mt-2">
                    Best student area
                  </h3>

                  <p className="text-gray-400 text-sm mt-3">
                    Livyfy AI prioritizes verified PGs near your searched location.
                  </p>

                  <button className="mt-5 bg-yellow-400 text-black px-5 py-3 rounded-full font-bold">
                    View on map
                  </button>
                </div>

                <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl animate-bounce">
                  📍
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Amenity({ text }) {
  return (
    <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 px-4 py-2 rounded-full text-sm">
      ✨ {text}
    </span>
  );
}

function RoomChip({ text }) {
  return (
    <span className="bg-white/5 text-gray-300 px-4 py-2 rounded-full">
      🛏 {text}
    </span>
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