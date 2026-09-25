import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Ticker from "./components/Ticker.jsx";
import Footer from "./components/Footer.jsx";
import Tabs from "./components/Tabs.jsx";
import GachaCard from "./components/GachaCard.jsx";
import Missions from "./components/Missions.jsx";
import Inventory from "./components/Inventory.jsx";
import Categories from "./components/Categories.jsx";
import People from "./components/People.jsx";
import MessagesWall from "./components/MessagesWall.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Legal from "./pages/Legal.jsx";

const TABS = [
  { id: "zones", label: "Zones" },
  { id: "missions", label: "Missions" },
  { id: "inventory", label: "Inventory" },
  { id: "codex", label: "Codex" },
  { id: "wall", label: "Mur" }
];

const PAGES = {
  portfolio: "Portfolio",
  legal: "Avís legal",
  privacidad: "Privacitat"
};

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("zones");
  const [page, setPage] = useState(null);
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((m) => setMsgCount(Array.isArray(m) ? m.length : 0))
      .catch(() => {});
  }, [tab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function openPage(id) {
    if (id === "demo") {
      setPage(null);
      setTab("zones");
      return;
    }
    setPage(id);
  }

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
      {page ? (
        <>
          <button className="back-btn" onClick={() => setPage(null)}>
            ← Tornar al panell
          </button>
          {page === "portfolio" && <Portfolio />}
          {page === "legal" && <Legal type="aviso" />}
          {page === "privacidad" && <Legal type="privacidad" />}
          <Footer profile={data.profile} onNavigate={openPage} />
        </>
      ) : (
        <>
          <Hero profile={data.profile} onNavigate={openPage} />
          <Ticker />
          <Stats
            locations={(data.locations || []).length}
            categories={(data.categories || []).length}
            people={(data.people || []).length}
            messages={msgCount}
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
            {tab === "missions" && <Missions missions={data.missions || []} />}
            {tab === "inventory" && <Inventory items={data.items || []} />}
            {tab === "codex" && (
              <>
                <Categories categories={data.categories || []} />
                <People people={data.people || []} />
              </>
            )}
            {tab === "wall" && <MessagesWall />}
          </main>

          <Footer profile={data.profile} onNavigate={openPage} />
        </>
      )}
    </div>
  );
}
