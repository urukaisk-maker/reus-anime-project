const ZONE_LABEL = {
  spawn: "◉ SPAWN", dungeon: "▲ DUNGEON", guild: "◆ GUILD",
  lab: "✦ LAB", shop: "◈ SHOP", vista: "◐ VISTA"
};
export default function GachaCard({ loc }) {
  const zoneLabel = ZONE_LABEL[loc.zoneType] || null;
  return (
    <article className={`card rarity-${loc.rarity.toLowerCase()}`}>
      <div className="card-media">
        {loc.image && <img src={loc.image} alt={loc.name} loading="lazy" />}
        <span className="card-region">{loc.region}</span>
        <span className="card-rarity">{loc.rarity}</span>
      </div>
      <div className="card-body">
        {zoneLabel && <span className="card-zone">{zoneLabel}</span>}
        <h3 className="card-name">{loc.name}</h3>
        <p className="card-tag">{loc.tag}</p>
        <p className="card-desc">{loc.description}</p>
        <footer className="card-stats">
          <div className="card-stat"><span className="stat-k">LV</span><span className="stat-v">{loc.level}</span></div>
          <div className="card-stat"><span className="stat-k">PWR</span><span className="stat-v">{loc.power}</span></div>
          {loc.reward && (
            <div className="card-stat card-stat-reward">
              <span className="stat-k">REWARD</span>
              <span className="stat-v reward-v">{loc.reward}</span>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
