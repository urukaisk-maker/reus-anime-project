export default function Footer({ profile }) {
  const year = new Date().getFullYear();
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
                <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-block">
          <h4>LEGAL</h4>
          <p className="dim">Proyecto personal sin ánimo de lucro.</p>
          <p className="dim">Las marcas citadas pertenecen a sus respectivos titulares.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} {profile.name} · Todos los derechos reservados</span>
        <span className="footer-sig">// CÓDIGO FORJADO EN EL MEDITERRÁNEO</span>
      </div>
    </footer>
  );
}
