import { useEffect } from "react";
import { playOpen, playClick } from "../utils/audio.js";

const ZONE_LABEL = {
  spawn: "◉ SPAWN",
  dungeon: "▲ DUNGEON",
  guild: "◆ GUILD",
  lab: "✦ LAB",
  shop: "◈ SHOP",
  vista: "◐ VISTA"
};

export default function CardModal({ loc, onClose }) {
  useEffect(() => {
    playOpen();
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleBackdrop(e) {
    if (e.target.classList.contains("modal-backdrop")) {
      playClick();
      onClose();
    }
  }

  const zoneLabel = ZONE_LABEL[loc.zoneType] || null;

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className={`modal-card rarity-${loc.rarity.toLowerCase()}`}>
        <button
          type="button"
          className="modal-close"
          onClick={() => {
            playClick();
            onClose();
          }}
          aria-label="Tancar"
        >
          ✕
        </button>

        <div className="modal-flip">
          <div className="modal-face modal-front">
            {loc.image && (
              <div className="modal-image">
                <img src={loc.image} alt={loc.name} />
                <div className="modal-image-glow" />
              </div>
            )}
            <div className="modal-body">
              <div className="modal-badges">
                <span className="modal-region">{loc.region}</span>
                <span className="modal-rarity">{loc.rarity}</span>
              </div>
              {zoneLabel && <span className="card-zone">{zoneLabel}</span>}
              <h2 className="modal-name">{loc.name}</h2>
              <p className="modal-tag">{loc.tag}</p>
              <p className="modal-desc">{loc.description}</p>
              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="stat-k">NIVELL</span>
                  <span className="stat-v">{loc.level}</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-k">PODER</span>
                  <span className="stat-v">{loc.power}</span>
                </div>
                {loc.reward && (
                  <div className="modal-stat modal-stat-reward">
                    <span className="stat-k">RECOMPENSA</span>
                    <span className="stat-v reward-v">{loc.reward}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
