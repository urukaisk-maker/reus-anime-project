import { useEffect, useState } from "react";
const PHRASES = [
  "Creado bajo la sombra del Campanar de Sant Pere y alimentado a base de vermut y commits limpios.",
  "Diseñando software desde la capital del Baix Camp para alterar la realidad digital de las personas.",
  "Misión actual: sobrevivir a un build fallido de Docker mientras suena synthwave en Reus."
];
export default function Ticker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PHRASES.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="ticker" aria-live="polite">
      <span className="ticker-label">// LOG</span>
      <span className="ticker-text">{PHRASES[i]}</span>
    </div>
  );
}
