export default function Inventory({ items }) {
  if (!items?.length) return <p className="empty">Inventari buit.</p>;
  return (
    <section className="inventory">
      {items.map((it) => (
        <article key={it.id} className={`item rarity-${it.rarity.toLowerCase()}`}>
          <div className="item-icon">{it.icon}</div>
          <div className="item-body">
            <header className="item-head"><h3>{it.name}</h3><span className="item-rarity">{it.rarity}</span></header>
            <p className="item-type">{it.type}</p>
            <p className="item-effect">{it.effect}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
