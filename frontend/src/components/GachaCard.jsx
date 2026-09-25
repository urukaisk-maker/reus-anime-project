export default function GachaCard({ loc }) {
  return (
    <article className={`card rarity-${loc.rarity.toLowerCase()}`}>
      <span className="card-corner tl" />
      <span className="card-corner tr" />
      <span className="card-corner bl" />
      <span className="card-corner br" />

      <header className="card-header">
        <span className="card-region">{loc.region}</span>
        <span className="card-rarity">{loc.rarity}</span>
      </header>

      <h3 className="card-name">{loc.name}</h3>
      <p className="card-tag">{loc.tag}</p>
      <p className="card-desc">{loc.description}</p>

      <footer className="card-stats">
        <div className="card-stat">
          <span className="stat-k">LV</span>
          <span className="stat-v">{loc.level}</span>
        </div>
        <div className="card-stat">
          <span className="stat-k">PWR</span>
          <span className="stat-v">{loc.power}</span>
        </div>
      </footer>
    </article>
  );
}
