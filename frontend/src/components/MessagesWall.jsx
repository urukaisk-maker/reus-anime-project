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
    } catch (e) {
      setError("No s'han pogut carregar els missatges.");
    }
  }

  useEffect(() => {
    load();
  }, []);
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
        <h3>Deixa el teu missatge</h3>
        <div className="wall-row">
          <input
            type="text"
            placeholder="El teu nom (màx 40)"
            value={author}
            maxLength={40}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <span className="counter">{author.length}/40</span>
        </div>
        <div className="wall-row">
          <textarea
            placeholder="Escriu el teu missatge (màx 280)"
            value={text}
            maxLength={280}
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />
          <span className="counter">{text.length}/280</span>
        </div>
        {error && <p className="wall-error">{error}</p>}
        <button type="submit" disabled={sending || !author.trim() || !text.trim()}>
          {sending ? "ENVIANT..." : "ENVIAR AL SECTOR"}
        </button>
      </form>

      <div className="wall-list">
        <h3>Missatges ({messages.length})</h3>
        {messages.length === 0 && <p className="empty">Sigues el primer a escriure!</p>}
        {messages.map((m) => (
          <article key={m.id} className="msg">
            <div className="msg-head">
              <span className="msg-author">{m.author}</span>
              <span className="msg-date">
                {new Date(m.createdAt).toLocaleString("ca-ES")}
              </span>
            </div>
            <p className="msg-text">{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
