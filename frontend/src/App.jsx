import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Tabs from "./components/Tabs.jsx";
import GachaCard from "./components/GachaCard.jsx";
import Categories from "./components/Categories.jsx";
import People from "./components/People.jsx";
import MessagesWall from "./components/MessagesWall.jsx";

const TABS = [
  { id: "zones", label: "Zones" },
  { id: "categories", label: "Categories" },
  { id: "people", label: "Gent de Reus" },
  { id: "wall", label: "Mur de Missatges" }
];

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("zones");

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
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "zones" && (
        <section className="grid">
          {data.locations.map((loc) => (
            <GachaCard key={loc.id} loc={loc} />
          ))}
        </section>
      )}

      {tab === "categories" && <Categories categories={data.categories || []} />}

      {tab === "people" && <People people={data.people || []} />}

      {tab === "wall" && <MessagesWall />}

      <Footer profile={data.profile} />
    </div>
  );
}
