import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[70vh] gap-6 px-4">
        <h1 className="text-4xl font-semibold text-center leading-tight">
          Find your next stay <br />
          <span className="text-blue-400">trusted & verified</span>
        </h1>

        <div className="w-full max-w-xl">
          <SearchBar
            value={query}
            setValue={setQuery}
            onSearch={() =>
              navigate("/ai", { state: { query } })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Home;