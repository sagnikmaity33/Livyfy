import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { aiQuery } from "../api/api";

function AiResults() {
  const { state } = useLocation();
  const query = state?.query || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    aiQuery(query)
      .then((res) => {
        const result = res.data.data;
        setData(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="glass p-6 rounded-3xl mb-8">
          <p className="text-yellow-300 text-sm mb-2">
            🤖 Livyfy AI understood your requirement
          </p>

          <h2 className="text-2xl font-semibold">"{query}"</h2>

          <div className="grid md:grid-cols-4 gap-3 mt-5 text-sm">
            <div className="glass p-3 rounded-xl">💰 Budget Match</div>
            <div className="glass p-3 rounded-xl">📍 Location Fit</div>
            <div className="glass p-3 rounded-xl">🛡 Verified Priority</div>
            <div className="glass p-3 rounded-xl">✨ AI Ranked</div>
          </div>
        </div>

        {loading && (
          <div className="glass p-6 rounded-3xl text-center">
            <div className="text-4xl animate-pulse">🏠</div>
            <p className="text-yellow-300 mt-3">
              AI is ranking the best stays for you...
            </p>
          </div>
        )}

        {!loading && data.length === 0 && (
          <div className="glass p-6 rounded-3xl text-center text-gray-400">
            No AI results found. Make sure backend and AI service are running.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AiResults;