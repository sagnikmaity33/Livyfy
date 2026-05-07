import { useState } from "react";
import Navbar from "../components/Navbar";
import { chatbotQuery } from "../api/api";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await chatbotQuery(message);
      setReply(JSON.stringify(res.data.data, null, 2));
    } catch (err) {
      console.error(err);
      setReply("AI service unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="relative min-h-[580px] rounded-[32px] overflow-hidden bg-[#111] border border-yellow-400/20 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80"
              alt="AI housing assistant"
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />

            <div className="relative z-10 p-10 max-w-3xl">
              <p className="text-yellow-400 font-semibold">
                Livyfy AI Assistant
              </p>

              <h1 className="text-6xl font-bold mt-4 leading-tight">
                Ask before you choose <br />
                <span className="text-yellow-400">your stay.</span>
              </h1>

              <p className="text-gray-300 text-lg mt-5 max-w-xl">
                Ask naturally about budget, food, safety, location, sharing rooms,
                verified PGs and booking approval.
              </p>

              <div className="mt-10 bg-black/75 border border-yellow-400/20 rounded-3xl p-5 flex gap-4 shadow-2xl">
                <input
                  className="flex-1 bg-transparent outline-none text-gray-200"
                  placeholder="Ask: safe PG under 7000 near college..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button
                  onClick={sendMessage}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition"
                >
                  Ask AI
                </button>
              </div>

              {loading && (
                <div className="mt-6 flex items-center gap-3 text-yellow-400">
                  <span className="text-3xl animate-bounce">🏠</span>
                  <p className="animate-pulse">AI is thinking like a housing advisor...</p>
                </div>
              )}

              {reply && (
                <pre className="mt-6 bg-black/80 border border-yellow-400/20 rounded-3xl p-5 text-sm whitespace-pre-wrap text-gray-300 max-h-64 overflow-auto">
                  {reply}
                </pre>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            <AiPhotoCard
              title="Budget Match"
              text="Ask for PGs under your monthly rent range."
              emoji="💰"
              img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
            />

            <AiPhotoCard
              title="Safety Guidance"
              text="Understand verified, safer and student-friendly options."
              emoji="🛡️"
              img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            />

            <AiPhotoCard
              title="Food & Comfort"
              text="Ask about food, wifi, AC, sharing and daily comfort."
              emoji="🍽️"
              img="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-10">
          <PromptChip text="PG under 6000 with food" setMessage={setMessage} />
          <PromptChip text="Safe girls PG near college" setMessage={setMessage} />
          <PromptChip text="Verified PG with wifi and AC" setMessage={setMessage} />
        </section>

        <section className="mt-16 rounded-[32px] bg-[#111] border border-yellow-400/20 p-10 text-center relative overflow-hidden">
          <div className="absolute left-10 top-8 text-7xl opacity-10 animate-bounce">
            🤖
          </div>
          <div className="absolute right-10 bottom-8 text-7xl opacity-10 animate-pulse">
            🏡
          </div>

          <p className="text-yellow-400 font-semibold">Explainable AI</p>
          <h2 className="text-4xl font-bold mt-3">
            Not just answers. Housing decisions with reasons.
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Livyfy AI helps users understand why a PG fits their budget,
            location, safety and comfort needs before they request booking.
          </p>
        </section>
      </main>
    </div>
  );
}

function AiPhotoCard({ title, text, emoji, img }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#111] border border-yellow-400/20 min-h-[175px] shadow-lg hover:scale-[1.02] transition">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30" />

      <div className="relative z-10 p-7">
        <div className="text-5xl mb-4 animate-pulse">{emoji}</div>
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-gray-300 mt-3 max-w-xs">{text}</p>
        <button className="mt-5 w-12 h-12 rounded-full bg-yellow-400 text-black text-xl font-bold">
          →
        </button>
      </div>
    </div>
  );
}

function PromptChip({ text, setMessage }) {
  return (
    <button
      onClick={() => setMessage(text)}
      className="bg-[#111] border border-yellow-400/20 rounded-3xl p-5 text-left hover:scale-[1.02] transition"
    >
      <p className="text-yellow-400 text-sm">Try asking</p>
      <h3 className="text-xl font-bold mt-2">{text}</h3>
    </button>
  );
}

export default Chatbot;