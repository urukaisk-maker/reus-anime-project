const LINK_ACTIONS = {
  GitHub: "external",
  Portfolio: "portfolio",
  Demo: "demo",
  "Aviso Legal": "legal",
  Privacidad: "privacidad"
};

export default function Hero({ profile, onNavigate }) {
  function handleClick(link) {
    const action = LINK_ACTIONS[link.label];
    if (action === "external") {
      window.open(link.url, "_blank", "noreferrer");
      return;
    }
    if (action === "demo") {
      onNavigate("demo");
      return;
    }
    if (action) onNavigate(action);
  }

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
          <span className="meta-pill">⚡ Disponible per a projectes</span>
        </div>
        <nav className="hero-links">
          {profile.links.map((l) => (
            <button
              key={l.label}
              type="button"
              className="cta"
              onClick={() => handleClick(l)}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
