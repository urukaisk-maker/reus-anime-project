export default function GachaCard({ loc }) {
  return (
    <article className={`card rarity-${loc.rarity.toLowerCase()}`}>
      <div className="card-top">
        <span className="region">{loc.region}</span>
        <span className="rarity">{loc.rarity}</span>
      </div>
      <h3 className="card-name">{loc.name}</h3>
      <p className="card-desc">{loc.description}</p>
      <div className="card-stats">
        <span>LV {loc.level}</span>
        <span>PWR {loc.power}</span>
      </div>
    </article>
  );
}
