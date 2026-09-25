import { useState, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";

export default function Inventory({ items }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("all");

  const counts = useMemo(() => {
    const c = { all: items.length, R: 0, SR: 0, SSR: 0 };
    items.forEach((i) => { c[i.rarity] = (c[i.rarity] || 0) + 1; });
    return c;
  }, [items]);

  const filters = [
    { id: "all", label: "Tots", count: counts.all },
    { id: "R", label: "R", count: counts.R },
    { id: "SR", label: "SR", count: counts.SR },
    { id: "SSR", label: "SSR", count: counts.SSR }
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (rarity !== "all" && it.rarity !== rarity) return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.type.toLowerCase().includes(q) ||
        it.effect.toLowerCase().includes(q)
      );
    });
  }, [items, query, rarity]);

  if (!items?.length) return <p className="empty">Inventari buit.</p>;

  return (
    <section className="inventory-wrap">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Cercar objectes, tipus, efectes..."
        filters={filters}
        activeFilter={rarity}
        onFilterChange={setRarity}
      />

      {filtered.length === 0 && <p className="empty">Cap objecte amb aquests filtres.</p>}

      <section className="inventory">
        {filtered.map((it) => (
          <article key={it.id} className={`item rarity-${it.rarity.toLowerCase()}`}>
            <div className="item-icon">{it.icon}</div>
            <div className="item-body">
              <header className="item-head">
                <h3>{it.name}</h3>
                <span className="item-rarity">{it.rarity}</span>
              </header>
              <p className="item-type">{it.type}</p>
              <p className="item-effect">{it.effect}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
