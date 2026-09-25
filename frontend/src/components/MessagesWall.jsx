import { useEffect, useState } from "react";

export default function MessagesWall() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

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
      setText("");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="wall">
      <form className="wall-form" onSubmit={submit}>
        <header className="wall-form-head">
          <h3>Deixa el teu missatge</h3>
          <p>Els missatges es guarden al servidor. Màxim 280 caràcters.</p>
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
            maxLength={280}
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />
          <span className="counter">{text.length}/280</span>
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

        {messages.map((m) => (
          <article key={m.id} className="msg">
            <header className="msg-head">
              <span className="msg-author">{m.author}</span>
              <span className="msg-date">
                {new Date(m.createdAt).toLocaleString("ca-ES")}
              </span>
            </header>
            <p className="msg-text">{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
