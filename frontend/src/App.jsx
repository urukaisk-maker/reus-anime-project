import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import GachaCard from "./components/GachaCard.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="app">
        <div className="loading">ERROR :: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app">
        <div className="loading">CARGANDO DATOS DEL SECTOR...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header profile={data.profile} />
      <section className="grid">
        {data.locations.map((loc) => (
          <GachaCard key={loc.id} loc={loc} />
        ))}
      </section>
      <Footer profile={data.profile} />
    </div>
  );
}
