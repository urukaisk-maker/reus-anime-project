import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (on && !audioRef.current) {
      // Radio streaming lofi synthwave libre
      const a = new Audio("https://streams.ilovemusic.de/iloveradio17.mp3");
      a.loop = true;
      a.volume = 0.25;
      a.play().catch(() => setOn(false));
      audioRef.current = a;
    } else if (!on && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [on]);

  return (
    <button
      type="button"
      className={`music-toggle ${on ? "on" : ""}`}
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Silenciar música" : "Activar música"}
      title={on ? "Silenciar música" : "Activar música synthwave"}
    >
      <span className="music-icon">{on ? "🔊" : "🔇"}</span>
      <span className="music-label">{on ? "MUSIC ON" : "MUSIC OFF"}</span>
    </button>
  );
}
