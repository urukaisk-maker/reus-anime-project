import { useState } from "react";

export default function Categories({ categories }) {
  const [openId, setOpenId] = useState(categories[0]?.id || null);

  if (!categories.length) return <p className="empty">Sense categories.</p>;

  return (
    <section className="categories">
      {categories.map((cat) => {
        const open = cat.id === openId;
        return (
          <article key={cat.id} className={`cat ${open ? "open" : ""}`}>
            <button className="cat-head" onClick={() => setOpenId(open ? null : cat.id)}>
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
  );
}
