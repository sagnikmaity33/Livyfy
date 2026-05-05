function FilterBar({ filters, setFilters, onApply }) {
  return (
    <div className="glass p-4 rounded-2xl flex flex-wrap gap-3 items-center">
      <input
        type="number"
        placeholder="Max price"
        className="bg-black/30 border border-yellow-400/20 px-4 py-2 rounded-full text-sm outline-none"
        value={filters.price}
        onChange={(e) => setFilters({ ...filters, price: e.target.value })}
      />

      <input
        type="text"
        placeholder="Location"
        className="bg-black/30 border border-yellow-400/20 px-4 py-2 rounded-full text-sm outline-none"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <label className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.verified}
          onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
        />
        Verified only
      </label>

      <button onClick={onApply} className="gold-btn px-5 py-2 rounded-full text-sm smooth">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;