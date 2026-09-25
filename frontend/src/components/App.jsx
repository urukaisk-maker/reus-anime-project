import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Footer from "./components/Footer.jsx";
import Tabs from "./components/Tabs.jsx";
import GachaCard from "./components/GachaCard.jsx";
import Categories from "./components/Categories.jsx";
import People from "./components/People.jsx";
import MessagesWall from "./components/MessagesWall.jsx";

const TABS = [
  { id: "zones", label: "Zones" },
  { id: "categories", label: "Categories" },
  { id: "people", label: "Gent" },
  { id: "wall", label: "Mur" }
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
        <div className="state state-error">
          <span className="state-label">ERROR</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app">
        <div className="state state-loading">
          <span className="state-label">CARGANDO</span>
          <div className="loader" />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Hero profile={data.profile} />
      <Stats
        locations={(data.locations || []).length}
        categories={(data.categories || []).length}
        people={(data.people || []).length}
        messages={0}
      />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      <main className="content">
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
      </main>

      <Footer profile={data.profile} />
    </div>
  );
}
