const PROJECTS = [
  {
    id: "reus-anime",
    title: "Reus Anime Cyberpunk",
    year: "2026",
    stack: "React · Vite · Node · Express · Docker",
    description:
      "Panel interactivo que convierte Reus y Tarragona en un universo RPG navegable. Zonas, misiones, inventario y mur de missatges amb identitat local.",
    url: "https://github.com/urukaisk-maker/reus-anime-project"
  },
  {
    id: "portfolio-web",
    title: "Portfolio personal",
    year: "2026",
    stack: "React · Tailwind",
    description:
      "Web de presentació professional amb projectes, stack i contacte. En construcció.",
    url: "#"
  },
  {
    id: "demo-lab",
    title: "Laboratori de demos",
    year: "2026",
    stack: "Next.js",
    description:
      "Col·lecció de prototips i experiments tècnics. Públic proper.",
    url: "#"
  }
];

export default function Portfolio() {
  return (
    <section className="portfolio">
      <header className="page-head">
        <p className="page-kicker">// PROJECTES</p>
        <h2 className="page-title">Portfolio</h2>
        <p className="page-desc">
          Selecció de treballs i experiments. Codi, identitat visual i territori.
        </p>
      </header>
      <div className="portfolio-grid">
        {PROJECTS.map((p) => (
          <article key={p.id} className="portfolio-card">
            <header className="portfolio-card-head">
              <h3>{p.title}</h3>
              <span className="portfolio-year">{p.year}</span>
            </header>
            <p className="portfolio-stack">{p.stack}</p>
            <p className="portfolio-desc">{p.description}</p>
            {p.url !== "#" && (
              <a className="portfolio-link" href={p.url} target="_blank" rel="noreferrer">
                Veure projecte →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
