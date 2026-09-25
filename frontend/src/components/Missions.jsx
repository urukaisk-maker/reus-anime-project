export default function Missions({ missions }) {
  if (!missions?.length) return <p className="empty">Sense missions actives.</p>;
  return (
    <section className="missions">
      {missions.map((m) => (
        <article key={m.id} className="mission">
          <header className="mission-head">
            <h3>{m.title}</h3>
            <span className="mission-diff">{m.difficulty}</span>
          </header>
          <p className="mission-desc">{m.description}</p>
          <div className="mission-progress">
            <div className="progress-bar"><span className="progress-fill" style={{ width: `${m.progress}%` }} /></div>
            <span className="progress-pct">{m.progress}%</span>
          </div>
          <footer className="mission-foot"><span className="mission-reward">🏆 {m.reward}</span></footer>
        </article>
      ))}
    </section>
  );
}
