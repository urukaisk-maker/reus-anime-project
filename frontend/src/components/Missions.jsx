import { useState, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";

export default function Missions({ missions }) {
  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState("all");

  const counts = useMemo(() => {
    const c = { all: missions.length };
    missions.forEach((m) => {
      const d = m.difficulty.replace(/★/g, "").length;
      const key = "d" + d;
      c[key] = (c[key] || 0) + 1;
    });
    return c;
  }, [missions]);

  const filters = [
    { id: "all", label: "Totes", count: counts.all },
    { id: "d1", label: "★", count: counts.d1 || 0 },
    { id: "d2", label: "★★", count: counts.d2 || 0 },
    { id: "d3", label: "★★★", count: counts.d3 || 0 },
    { id: "d4", label: "★★★★", count: counts.d4 || 0 },
    { id: "d5", label: "★★★★★", count: counts.d5 || 0 }
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return missions.filter((m) => {
      if (diff !== "all") {
        const stars = m.difficulty.replace(/★/g, "").length;
        if (diff !== "d" + stars) return false;
      }
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.reward.toLowerCase().includes(q)
      );
    });
  }, [missions, query, diff]);

  if (!missions?.length) return <p className="empty">Sense missions actives.</p>;

  return (
    <section className="missions-wrap">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Cercar missions, recompenses..."
        filters={filters}
        activeFilter={diff}
        onFilterChange={setDiff}
      />

      {filtered.length === 0 && <p className="empty">Cap missió amb aquests filtres.</p>}

      <section className="missions">
        {filtered.map((m) => (
          <article key={m.id} className="mission">
            <header className="mission-head">
              <h3>{m.title}</h3>
              <span className="mission-diff">{m.difficulty}</span>
            </header>
            <p className="mission-desc">{m.description}</p>
            <div className="mission-progress">
              <div className="progress-bar">
                <span className="progress-fill" style={{ width: `${m.progress}%` }} />
              </div>
              <span className="progress-pct">{m.progress}%</span>
            </div>
            <footer className="mission-foot">
              <span className="mission-reward">🏆 {m.reward}</span>
            </footer>
          </article>
        ))}
      </section>
    </section>
  );
}
