export default function Legal({ type }) {
  if (type === "privacidad") {
    return (
      <section className="legal">
        <header className="page-head">
          <p className="page-kicker">// LEGAL</p>
          <h2 className="page-title">Política de privacitat</h2>
        </header>
        <div className="legal-body">
          <h3>1. Responsable</h3>
          <p>
            Aquest lloc és un projecte personal de Manuel Casimiro Carrasco
            (urukaisk-maker), desenvolupat a Reus i Tarragona. No té finalitat
            comercial ni recull dades amb ànim de lucre.
          </p>
          <h3>2. Dades que es recullen</h3>
          <p>
            Únicament les que l'usuari decideix introduir voluntàriament al mur
            de missatges: un nom (o àlies) i un text. Cap dada addicional
            s'emmagatzema.
          </p>
          <h3>3. Finalitat</h3>
          <p>
            Els missatges es mostren públicament al mur per fomentar la
            participació comunitària al voltant del projecte.
          </p>
          <h3>4. Conservació</h3>
          <p>
            Els missatges es conserven mentre el projecte estigui actiu. Es pot
            sol·licitar la seva eliminació per correu.
          </p>
          <h3>5. Drets</h3>
          <p>
            Qualsevol persona pot sol·licitar l'accés, rectificació o supressió
            de les seves dades enviant un correu al responsable del projecte.
          </p>
          <h3>6. Cookies</h3>
          <p>
            Aquest lloc no utilitza cookies de seguiment ni analítiques de
            tercers.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="legal">
      <header className="page-head">
        <p className="page-kicker">// LEGAL</p>
        <h2 className="page-title">Avís legal</h2>
      </header>
      <div className="legal-body">
        <h3>1. Titular</h3>
        <p>
          Aquest lloc web és propietat de Manuel Casimiro Carrasco
          (urukaisk-maker), desenvolupador de programari a Reus i Tarragona.
        </p>
        <h3>2. Objecte</h3>
        <p>
          És un projecte personal de caràcter cultural i tecnològic que
          reinterpreta el patrimoni de Reus i Tarragona en un univers de ficció
          amb estètica anime i cyberpunk.
        </p>
        <h3>3. Propietat intel·lectual</h3>
        <p>
          El codi font és obra del titular i es publica al seu repositori de
          GitHub. Les marques, noms de llocs i referències culturals
          esmentades pertanyen als seus respectius titulars i s'utilitzen amb
          finalitat merament divulgativa.
        </p>
        <h3>4. Responsabilitat</h3>
        <p>
          El titular no es fa responsable de l'ús que tercers facin de la
          informació publicada ni dels continguts dels missatges enviats pels
          usuaris al mur públic.
        </p>
        <h3>5. Modificacions</h3>
        <p>
          El contingut d'aquest avís pot canviar sense previ avís per adaptar-se
          a novetats legislatives o del projecte.
        </p>
        <h3>6. Legislació aplicable</h3>
        <p>
          Aquest avís es regeix per la legislació espanyola i catalana vigent.
        </p>
      </div>
    </section>
  );
}
