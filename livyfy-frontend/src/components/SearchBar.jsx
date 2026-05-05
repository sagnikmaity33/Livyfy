function SearchBar({ value, setValue, onSearch }) {
  return (
    <div className="glass rounded-full px-5 py-3 flex items-center gap-3 shadow-2xl">
      <span className="text-yellow-300 text-lg">🔍</span>

      <input
        className="bg-transparent flex-1 outline-none text-sm placeholder:text-gray-500"
        placeholder="Try: PG under 6000 with food near college..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />

      <button onClick={onSearch} className="gold-btn px-6 py-2 rounded-full text-sm smooth">
        AI Search
      </button>
    </div>
  );
}

export default SearchBar;