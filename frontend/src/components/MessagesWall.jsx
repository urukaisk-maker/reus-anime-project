import { useEffect, useState } from "react";
import { playClick, playSuccess } from "../utils/audio.js";

export default function MessagesWall() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("liked-messages") || "[]");
    } catch {
      return [];
    }
  });

  async function load() {
    try {
      const r = await fetch("/api/messages");
      const data = await r.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setError("No s'han pogut carregar els missatges.");
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    localStorage.setItem("liked-messages", JSON.stringify(liked));
  }, [liked]);

  async function submit(e) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    setSending(true);
    setError(null);
    try {
      const r = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text })
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err.error || "Error enviant el missatge.");
      }
      playSuccess();
      setText("");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  async function kudo(id) {
    if (liked.includes(id)) return;
    playClick();
    try {
      const r = await fetch(`/api/messages/${id}/like`, { method: "POST" });
      if (!r.ok) throw new Error();
      const updated = await r.json();
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setLiked((prev) => [...prev, id]);
    } catch {
      setError("No s'ha pogut donar el kudo.");
    }
  }

  return (
    <section className="wall">
      <form className="wall-form" onSubmit={submit}>
        <header className="wall-form-head">
          <h3>Deixa el teu missatge</h3>
          <p>Els missatges es guarden al servidor. Màxim 250 caràcters. Cooldown 20s.</p>
        </header>

        <label className="field">
          <span>Nom</span>
          <input
            type="text"
            placeholder="Com et dius?"
            value={author}
            maxLength={40}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <span className="counter">{author.length}/40</span>
        </label>

        <label className="field">
          <span>Missatge</span>
          <textarea
            placeholder="Escriu el que vulguis..."
            value={text}
            maxLength={250}
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />
          <span className="counter">{text.length}/250</span>
        </label>

        {error && <p className="wall-error">{error}</p>}

        <button type="submit" disabled={sending || !author.trim() || !text.trim()}>
          {sending ? "ENVIANT..." : "ENVIAR AL SECTOR"}
        </button>
      </form>

      <div className="wall-list">
        <header className="wall-list-head">
          <h3>Mur públic</h3>
          <span className="wall-count">{messages.length} missatges</span>
        </header>

        {messages.length === 0 && (
          <p className="empty">Sigues el primer a deixar un missatge.</p>
        )}

        {messages.map((m) => {
          const isLiked = liked.includes(m.id);
          return (
            <article key={m.id} className="msg">
              <header className="msg-head">
                <span className="msg-author">{m.author}</span>
                <span className="msg-date">
                  {new Date(m.createdAt).toLocaleString("ca-ES")}
                </span>
              </header>
              <p className="msg-text">{m.text}</p>
              <footer className="msg-foot">
                <button
                  type="button"
                  className={`kudo-btn ${isLiked ? "liked" : ""}`}
                  onClick={() => kudo(m.id)}
                  disabled={isLiked}
                  title={isLiked ? "Ja has donat un kudo" : "Donar un kudo"}
                >
                  <span className="kudo-icon">⚡</span>
                  <span className="kudo-count">{m.likes || 0}</span>
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
