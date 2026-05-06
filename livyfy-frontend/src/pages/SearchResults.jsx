import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { hybridSearch, aiDebate } from "../api/api";

function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [listings, setListings] = useState([]);
  const [aiData, setAiData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // 🔍 HYBRID SEARCH
  useEffect(() => {
    if (!query) return;

    setLoading(true);

    hybridSearch({
      query,
      location: "Kolkata",
      maxPrice: 10000,
      verified: true,
    })
      .then((res) => setListings(res.data.data || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [query]);

  // 🤖 AI DEBATE
  const handleAi = async () => {
    if (listings.length === 0) return;

    setAiLoading(true);

    const topListings = listings.slice(0, 5).map((l) => ({
      id: l.id,
      title: l.title,
      price: l.price,
      distanceKm: l.distanceKm,
      durationMinutes: l.durationMinutes,
    }));

    try {
      const res = await aiDebate({
        query,
        previousContext: "",
        listings: topListings,
      });

      setAiData(res.data.data);
    } catch (err) {
      console.error(err);
    }

    setAiLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="glass p-6 rounded-3xl mb-8">
          <p className="text-yellow-300 text-sm mb-2">
            🤖 Livyfy understood your requirement
          </p>

          <h2 className="text-2xl font-semibold">"{query}"</h2>
        </div>

        {/* 🤖 AI INSIGHTS */}
        {aiData && (
          <div className="glass p-6 rounded-3xl mb-8">
            <h3 className="text-lg font-semibold mb-4">
              🧠 Best Picks For You
            </h3>

            {aiData.final.best_choices.map((item) => (
              <div
                key={item.id}
                className="border-b border-white/10 pb-4 mb-4"
              >
                <h4 className="font-semibold text-lg">
                  ⭐ {item.title} ({item.score})
                </h4>

                <p className="text-gray-400 text-sm mt-1">
                  {item.why_best}
                </p>

                <div className="text-green-400 text-sm mt-2">
                  👍 {item.pros.join(", ")}
                </div>

                <div className="text-red-400 text-sm">
                  👎 {item.cons.join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI BUTTON */}
        {!aiData && (
          <button
            onClick={handleAi}
            className="mb-8 bg-blue-600 px-6 py-3 rounded-full smooth"
          >
            {aiLoading ? "Analyzing..." : "✨ Find Best Options"}
          </button>
        )}

        {/* LISTINGS */}
        {loading ? (
          <div className="glass p-6 rounded-3xl text-center">
            <p className="text-yellow-300">
              Loading listings...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;