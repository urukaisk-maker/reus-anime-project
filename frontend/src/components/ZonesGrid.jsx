import { useState, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";
import GachaCard from "./GachaCard.jsx";

export default function ZonesGrid({ locations, onOpen }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  const counts = useMemo(() => {
    const c = { all: locations.length };
    locations.forEach((l) => { c[l.region] = (c[l.region] || 0) + 1; });
    return c;
  }, [locations]);

  const filters = [
    { id: "all", label: "Totes", count: counts.all },
    { id: "Reus", label: "Reus", count: counts.Reus || 0 },
    { id: "Tarragona", label: "Tarragona", count: counts.Tarragona || 0 }
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((l) => {
      if (region !== "all" && l.region !== region) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.tag.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.reward || "").toLowerCase().includes(q)
      );
    });
  }, [locations, query, region]);

  return (
    <section className="zones-wrap">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Cercar zones, recompenses..."
        filters={filters}
        activeFilter={region}
        onFilterChange={setRegion}
      />

      {filtered.length === 0 && <p className="empty">Cap zona amb aquests filtres.</p>}

      <section className="grid">
        {filtered.map((loc) => (
          <GachaCard key={loc.id} loc={loc} onOpen={onOpen} />
        ))}
      </section>
    </section>
  );
}
