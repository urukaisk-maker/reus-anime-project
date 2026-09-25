export default function NotFound() {
  return (
    <section className="not-found">
      <div className="nf-code">404</div>
      <p className="nf-kicker">// SECTOR NO TROBAT</p>
      <h2 className="nf-title">Aquesta zona encara no s'ha desbloquejat</h2>
      <p className="nf-desc">
        El mapa del Baix Camp encara no ha registrat aquesta coordenada.
        Torna al panell principal per continuar explorant Reus i Tarragona.
      </p>
      <a className="nf-btn" href="/">← Tornar al panell</a>
    </section>
  );
}
