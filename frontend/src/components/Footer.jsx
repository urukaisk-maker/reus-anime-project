const LINK_ACTIONS = {
  GitHub: "external",
  Portfolio: "portfolio",
  Demo: "demo",
  "Aviso Legal": "legal",
  Privacidad: "privacidad"
};

export default function Footer({ profile, onNavigate }) {
  const year = new Date().getFullYear();

  function handle(link) {
    const action = LINK_ACTIONS[link.label];
    if (action === "external") {
      window.open(link.url, "_blank", "noreferrer");
      return;
    }
    if (action === "demo") {
      onNavigate && onNavigate("demo");
      return;
    }
    onNavigate && onNavigate(action);
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-block">
          <h4>SECTOR</h4>
          <p>Reus · Tarragona · Catalunya</p>
        </div>
        <div className="footer-block">
          <h4>AUTOR</h4>
          <p>{profile.name}</p>
          <p className="dim">@{profile.alias}</p>
        </div>
        <div className="footer-block">
          <h4>ENLACES</h4>
          <ul>
            {profile.links.map((l) => (
              <li key={l.label}>
                <button type="button" className="link-btn" onClick={() => handle(l)}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-block">
          <h4>LEGAL</h4>
          <p className="dim">Projecte personal sense ànim de lucre.</p>
          <p className="dim">
            Les marques i noms citats pertanyen als seus respectius titulars.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} {profile.name} · Tots els drets reservats</span>
        <span className="footer-sig">// CÓDIGO FORJADO EN EL MEDITERRÁNEO</span>
      </div>
    </footer>
  );
}
