




import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  aiRecommend,
  aiDebate,
} from "../api/api";

function Chatbot() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  const [debateData, setDebateData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [debateLoading, setDebateLoading] = useState(false);

  // =========================
  // AI RECOMMEND
  // =========================

  const handleAsk = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      setDebateData(null);

      const res = await aiRecommend({
        message,
        previousContext: "",
      });

      setRecommendations(
        res.data.data.recommendations || []
      );
    } catch (err) {
      console.error(err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // AI DEBATE
  // =========================

  const handleDebate = async () => {
    try {
      setDebateLoading(true);

      const topListings = recommendations
        .slice(0, 5)
        .map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          distanceKm: item.distanceKm,
          durationMinutes: item.durationMinutes,
        }));

      const res = await aiDebate({
        query: message,
        previousContext: "",
        listings: topListings,
      });

      setDebateData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDebateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[36px] border border-yellow-400/20 bg-[#111] p-10">

          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-4xl">

            <p className="text-yellow-400 font-semibold">
              Livyfy AI Housing Advisor
            </p>

            <h1 className="text-6xl font-bold mt-4 leading-tight">
              Ask AI before choosing
              <br />
              your next stay.
            </h1>

            <p className="text-gray-300 text-lg mt-5 max-w-2xl">
              Ask naturally about budget, safety, commute,
              verified PGs, food, sharing rooms and student areas.
            </p>

            {/* SEARCH BOX */}
            <div className="mt-10 bg-black/80 border border-yellow-400/20 rounded-3xl p-5 flex gap-4 shadow-2xl">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAsk()
                }
                placeholder="safe PG under 7000 near sector 5..."
                className="flex-1 bg-transparent outline-none text-lg text-gray-200"
              />

              <button
                onClick={handleAsk}
                className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition"
              >
                Ask AI
              </button>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="mt-8 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold animate-pulse">
                  AI
                </div>

                <div>
                  <p className="text-yellow-400 font-semibold">
                    Livyfy AI is analyzing...
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    Checking budget, commute and verified stays
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AI RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <section className="mt-12">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-yellow-400 font-semibold">
                  AI Recommendations
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  Best matches for your needs
                </h2>
              </div>

              {!debateData && (
                <button
                  onClick={handleDebate}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
                >
                  {debateLoading
                    ? "Analyzing..."
                    : "✨ AI Compare"}
                </button>
              )}
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">

              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#111] border border-yellow-400/20 rounded-[32px] overflow-hidden hover:scale-[1.02] transition"
                >
                  <div className="relative h-60">

                    <img
                      src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                      alt=""
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                      AI Suggested
                    </div>
                  </div>

                  <div className="p-6">

                    <div className="flex justify-between items-start gap-4">

                      <div>
                        <h3 className="text-2xl font-bold">
                          {item.title}
                        </h3>

                        <p className="text-gray-400 mt-2 text-sm">
                          {item.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 flex-wrap">

                      <span className="bg-yellow-400/10 text-yellow-300 px-4 py-2 rounded-full text-sm">
                        ₹ {item.price}
                      </span>

                      <span className="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm">
                        📍 {item.distanceKm} km
                      </span>

                      <span className="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm">
                        ⏱ {item.durationMinutes} mins
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/listing/${item.id}`)
                      }
                      className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-2xl font-bold hover:bg-yellow-300 transition"
                    >
                      View Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI DEBATE */}
        {debateData && (
          <section className="mt-14 bg-[#111] border border-yellow-400/20 rounded-[36px] p-10">

            <p className="text-yellow-400 font-semibold">
              Premium AI Multi-Agent Insights
            </p>

            <h2 className="text-5xl font-bold mt-3">
              AI selected the strongest options
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {debateData.final.best_choices.map((item) => (
                <div
                  key={item.id}
                  className="bg-black border border-yellow-400/20 rounded-[32px] p-7"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-yellow-400 font-semibold">
                        🏆 Best Overall
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
                        {item.title}
                      </h3>
                    </div>

                    <div className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold">
                      {item.score}
                    </div>
                  </div>

                  <p className="text-gray-300 mt-5">
                    {item.why_best}
                  </p>

                  {/* PROS */}
                  <div className="mt-7">

                    <p className="text-green-400 font-semibold">
                      👍 Strengths
                    </p>

                    <div className="flex flex-wrap gap-3 mt-3">

                      {item.pros.map((pro, idx) => (
                        <span
                          key={idx}
                          className="bg-green-400/10 text-green-300 px-4 py-2 rounded-full text-sm"
                        >
                          {pro}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CONS */}
                  <div className="mt-7">

                    <p className="text-red-400 font-semibold">
                      👎 Considerations
                    </p>

                    <div className="flex flex-wrap gap-3 mt-3">

                      {item.cons.map((con, idx) => (
                        <span
                          key={idx}
                          className="bg-red-400/10 text-red-300 px-4 py-2 rounded-full text-sm"
                        >
                          {con}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/listing/${item.id}`)
                    }
                    className="mt-8 w-full bg-yellow-400 text-black py-3 rounded-2xl font-bold hover:bg-yellow-300 transition"
                  >
                    Open Listing
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Chatbot;