import { useState, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";

export default function People({ people }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.era.toLowerCase().includes(q)
    );
  }, [people, query]);

  if (!people.length) return <p className="empty">Sense personatges.</p>;

  return (
    <section className="people-wrap">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Cercar personatges, rols, èpoques..."
      />

      {filtered.length === 0 && (
        <p className="empty">Cap personatge per «{query}».</p>
      )}

      <section className="people">
        {filtered.map((p) => (
          <article key={p.id} className="person">
            <div className="person-avatar" data-initials={p.initials || p.name.charAt(0)} />
            <div className="person-body">
              <header className="person-head">
                <h3>{p.name}</h3>
                <span className="person-era">{p.era}</span>
              </header>
              <p className="person-role">{p.role}</p>
              <p className="person-bio">{p.bio}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
