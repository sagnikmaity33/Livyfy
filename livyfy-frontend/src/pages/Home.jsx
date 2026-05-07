import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 🔍 SEARCH FLOW
  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/explore?query=${query}`)
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="relative min-h-[580px] rounded-[28px] overflow-hidden bg-white shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80"
              alt="student housing"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />

            <div className="relative z-10 p-10 max-w-xl">
              <p className="text-sm font-semibold text-yellow-700 mb-4">
                AI-powered verified student housing
              </p>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your second home <br />
                in a new city.
              </h1>

              <p className="text-lg mt-6 text-gray-700 leading-relaxed">
                Find safe, verified PGs with AI ranking, smart filters and owner approval.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="absolute left-6 right-6 md:left-10 md:right-10 bottom-8 z-10 bg-white rounded-3xl p-4 md:p-5 shadow-2xl flex flex-col md:flex-row items-center gap-4">

              <div className="flex-1 w-full">
                <p className="font-semibold text-lg">
                  Find in and around...
                </p>

                <input
                  className="w-full outline-none text-gray-600 mt-1 bg-transparent"
                  placeholder="Search PG near college, under 6000..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch()
                  }
                />
              </div>

              <button className="w-14 h-14 rounded-full bg-yellow-100 text-2xl shrink-0">
                📍
              </button>

              <button
                onClick={handleSearch}
                className="bg-yellow-400 hover:bg-yellow-300 transition px-8 py-4 rounded-2xl font-bold shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* SIDE FEATURE CARDS */}
          <div className="grid gap-6">
            <FeatureCard
              title="Modern Student Housing"
              emoji="🎓"
              text="Verified PGs built for college life."
            />

            <FeatureCard
              title="AI Smart Search"
              emoji="🤖"
              text="Search by budget, food, safety and location."
            />

            <FeatureCard
              title="Owner Approval Flow"
              emoji="🔐"
              text="No phone chaos. Booking goes for owner approval."
            />
          </div>
        </section>

        {/* INFO BOXES */}
        <section className="grid md:grid-cols-4 gap-5 mt-8">
          <InfoBox icon="⚡" title="AI Ranking" />
          <InfoBox icon="✅" title="Verified Listings" />
          <InfoBox icon="🍽️" title="Food Filter" />
          <InfoBox icon="🛡️" title="Safety First" />
        </section>

        {/* WHY LIVYFY */}
        <section className="mt-20">
          <p className="text-yellow-700 font-semibold">
            Why Livyfy?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-2 max-w-3xl leading-tight">
            Housing decisions should feel simple, safe and smart.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <QuoteCard
              quote="No more random calls, fake promises or confusing PG hunting."
              title="For Students"
              img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
            />

            <QuoteCard
              quote="Owners get genuine booking requests without sharing phone numbers publicly."
              title="For Owners"
              img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
            />

            <QuoteCard
              quote="AI explains why a stay matches your budget, location and safety needs."
              title="For Trust"
              img="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </section>

        {/* AI SECTION */}
        <section className="mt-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-[32px] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="comfortable home"
              className="w-full h-[430px] object-cover"
            />
          </div>

          <div>
            <p className="text-yellow-700 font-semibold">
              Explainable AI
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Not just search results. Real reasons.
            </h2>

            <p className="text-gray-700 text-lg mt-5 leading-relaxed">
              Livyfy ranks stays using filters and AI, then helps users understand why a PG fits their needs.
              Budget, verified status, location, food and safety become clear before booking.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <MiniStat number="4+" label="Smart filters" />
              <MiniStat number="AI" label="Semantic ranking" />
              <MiniStat number="0" label="Phone chaos" />
              <MiniStat number="1" label="Trusted flow" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-[36px] bg-black text-white p-10 md:p-14 overflow-hidden relative">

          <div className="absolute right-10 top-10 text-8xl opacity-20 animate-bounce">
            🏠
          </div>

          <p className="text-yellow-300 font-semibold">
            Built for campus life
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 max-w-3xl leading-tight">
            “Find a stay where you feel safe before you even visit.”
          </h2>

          <p className="text-gray-300 mt-5 max-w-2xl text-lg leading-relaxed">
            From search to booking approval, Livyfy removes confusion and builds trust between students and owners.
          </p>

          <button
            onClick={() => navigate("/search?query=pg")}
            className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Explore Verified Stays
          </button>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ title, emoji, text }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white p-8 shadow-lg min-h-[175px] hover:scale-[1.02] transition duration-300">
      <div className="absolute right-6 bottom-4 text-7xl opacity-80">
        {emoji}
      </div>

      <h3 className="text-3xl font-bold max-w-xs">
        {title}
      </h3>

      <p className="text-gray-600 mt-3 max-w-xs">
        {text}
      </p>

      <button className="mt-6 w-12 h-12 rounded-full bg-black text-white text-xl">
        →
      </button>
    </div>
  );
}

function InfoBox({ icon, title }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md flex items-center gap-3">
      <span className="text-2xl">{icon}</span>

      <p className="font-semibold">
        {title}
      </p>
    </div>
  );
}

function QuoteCard({ quote, title, img }) {
  return (
    <div className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300">
      <img
        src={img}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h3 className="text-2xl font-bold mt-3 leading-snug">
          “{quote}”
        </h3>
      </div>
    </div>
  );
}

function MiniStat({ number, label }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md">
      <p className="text-3xl font-bold text-yellow-600">
        {number}
      </p>

      <p className="text-gray-600 mt-1">
        {label}
      </p>
    </div>
  );
}

export default Home;