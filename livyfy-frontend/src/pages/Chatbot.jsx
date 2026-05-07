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
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="glass p-6 rounded-3xl">
          <p className="text-yellow-300 text-sm">Livyfy AI Assistant</p>

          <h2 className="text-3xl font-bold mt-2">
            Ask about verified student stays
          </h2>

          <div className="mt-6 flex gap-3">
            <input
              className="bg-black/30 border border-yellow-400/20 px-4 py-3 rounded-full flex-1 outline-none"
              placeholder="Ask: safe PG under 7000 near college..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage} className="gold-btn px-6 py-3 rounded-full smooth">
              Ask AI
            </button>
          </div>

          {loading && <p className="text-yellow-300 mt-6">AI is thinking...</p>}

          {reply && (
            <pre className="glass p-4 rounded-2xl mt-6 text-sm whitespace-pre-wrap text-gray-300">
              {reply}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;