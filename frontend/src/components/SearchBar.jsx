export default function SearchBar({ value, onChange, placeholder, filters, activeFilter, onFilterChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Cercar..."}
        />
        {value && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onChange("")}
            aria-label="Netejar"
          >
            ✕
          </button>
        )}
      </div>
      {filters && filters.length > 0 && (
        <div className="search-filters">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-pill ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
              {f.count != null && <span className="filter-count">{f.count}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
