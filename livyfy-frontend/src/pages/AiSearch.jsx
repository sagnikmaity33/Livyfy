import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { aiQuery } from "../api/api";
import Layout from "../components/Layout";

function AISearch() {
  const location = useLocation();
  const query = location.state?.query || "";

  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (query) {
      aiQuery(query).then((res) => {
        setResponse(res.data.data);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <Layout>
      <h2 className="text-lg font-semibold mb-2">AI Results</h2>
      <p className="text-gray-500 mb-4">"{query}"</p>

      {loading && <p>Thinking...</p>}

      {!loading && (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </Layout>
  );
}

export default AISearch;