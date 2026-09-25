import { useState, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";

export default function Categories({ categories }) {
  const [openId, setOpenId] = useState(categories[0]?.id || null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => {
        const matchCat =
          cat.name.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q);
        const subcategories = cat.subcategories
          .map((sub) => {
            const matchSub = sub.name.toLowerCase().includes(q);
            const items = sub.items.filter((it) => it.toLowerCase().includes(q));
            if (matchSub) return sub;
            if (items.length) return { ...sub, items };
            return null;
          })
          .filter(Boolean);
        if (matchCat) return cat;
        if (subcategories.length) return { ...cat, subcategories };
        return null;
      })
      .filter(Boolean);
  }, [categories, query]);

  if (!categories.length) return <p className="empty">Sense categories.</p>;

  return (
    <section className="categories-wrap">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Cercar a la història, gastronomia, festes..."
      />

      {filtered.length === 0 && (
        <p className="empty">Cap resultat per «{query}».</p>
      )}

      <section className="categories">
        {filtered.map((cat) => {
          const open = cat.id === openId || !!query;
          return (
            <article key={cat.id} className={`cat ${open ? "open" : ""}`}>
              <button className="cat-head" onClick={() => setOpenId(open && !query ? null : cat.id)}>
                <span className="cat-icon">{cat.icon}</span>
                <div className="cat-title">
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                </div>
                <span className="cat-toggle" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>

              {open && (
                <div className="cat-body">
                  <div className="subcats">
                    {cat.subcategories.map((sub) => (
                      <div key={sub.id} className="subcat">
                        <h4>{sub.name}</h4>
                        <ul>
                          {sub.items.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </section>
  );
}
