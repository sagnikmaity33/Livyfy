import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { aiQuery } from "../api/api";
import Navbar from "../components/Navbar";

function AIResults() {
  const { state } = useLocation();
  const query = state?.query;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (query) {
      aiQuery(query).then((res) => {
        setData(res.data.data);
      });
    }
  }, [query]);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-lg font-semibold mb-2">
          AI Results
        </h2>
        <p className="text-gray-400 mb-4">{query}</p>

        <div className="glass p-4 rounded-xl">
          <pre className="text-sm whitespace-pre-wrap text-gray-300">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default AIResults;