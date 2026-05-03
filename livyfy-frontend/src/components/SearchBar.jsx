function SearchBar({ value, setValue, onSearch }) {
  return (
    <div className="glass rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
      <input
        className="bg-transparent flex-1 outline-none text-sm"
        placeholder="Search PG under 6000 with wifi..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm smooth"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;