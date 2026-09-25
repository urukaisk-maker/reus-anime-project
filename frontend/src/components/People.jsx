export default function People({ people }) {
  if (!people.length) {
    return <p className="empty">Encara no hi ha personatges.</p>;
  }

  return (
    <section className="people">
      {people.map((p) => (
        <article key={p.id} className="person">
          <div className="person-head">
            <h3>{p.name}</h3>
            <span className="person-era">{p.era}</span>
          </div>
          <p className="person-role">{p.role}</p>
          <p className="person-bio">{p.bio}</p>
        </article>
      ))}
    </section>
  );
}
