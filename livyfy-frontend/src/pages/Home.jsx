import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate("/ai", { state: { query } });
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <div className="inline-flex glass px-4 py-2 rounded-full text-sm text-yellow-300 mb-6">
            ✨ AI-powered campus housing search
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find your next stay <br />
            <span className="gold-text">trusted & verified</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Livyfy helps students discover safe, verified PGs using AI ranking,
            smart filters and explainable recommendations.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar value={query} setValue={setQuery} onSearch={handleSearch} />
          </div>

          <div className="flex flex-wrap gap-3 mt-6 text-sm text-gray-400">
            <span className="glass px-4 py-2 rounded-full">⚡ AI Ranking</span>
            <span className="glass px-4 py-2 rounded-full">✔ Verified PGs</span>
            <span className="glass px-4 py-2 rounded-full">🍽 Food Filter</span>
            <span className="glass px-4 py-2 rounded-full">🛡 Safety First</span>
          </div>
        </div>

        <div className="relative">
          <div className="float-house text-9xl">🏠</div>

          <div className="glass p-5 rounded-3xl mt-6 w-80">
            <p className="text-yellow-300 text-sm">AI Insight Preview</p>
            <h3 className="text-xl font-semibold mt-2">Best match found</h3>
            <p className="text-gray-400 text-sm mt-2">
              Budget friendly, verified, near preferred location, and student-safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;