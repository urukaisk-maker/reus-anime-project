export default function People({ people }) {
  if (!people.length) return <p className="empty">Sense personatges.</p>;

  return (
    <section className="people">
      {people.map((p) => (
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
  );
}
