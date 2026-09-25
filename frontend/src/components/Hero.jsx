export default function Hero({ profile }) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="grid-lines" />
      </div>
      <div className="hero-content">
        <p className="hero-kicker">
          <span className="dot" /> SECTOR REUS · TARRAGONA · ONLINE
        </p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-alias">@{profile.alias}</p>
        <h2 className="hero-title">{profile.title}</h2>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-bio">{profile.bio}</p>
        <div className="hero-meta">
          <span className="meta-pill">📍 {profile.location}</span>
          <span className="meta-pill">⚡ Disponible para proyectos</span>
        </div>
        <nav className="hero-links">
          {profile.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="cta">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
