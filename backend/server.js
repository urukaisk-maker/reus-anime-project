const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_FILE = path.join(__dirname, "data", "db.json");
const MSG_FILE = path.join(__dirname, "data", "messages.json");

const lastPost = new Map();
const COOLDOWN_MS = 20_000;

app.use(cors());
app.use(express.json());

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "reus-anime-backend",
    author: "Manuel Casimiro Carrasco"
  });
});

app.get("/api/data", (_req, res) => {
  try {
    res.json(readJson(DATA_FILE));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo leer la base de datos." });
  }
});

app.get("/api/locations/:id", (req, res) => {
  try {
    const data = readJson(DATA_FILE);
    const loc = data.locations.find((l) => l.id === req.params.id);
    if (!loc) return res.status(404).json({ error: "Localización no encontrada." });
    res.json(loc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error leyendo la base de datos." });
  }
});

app.get("/api/categories", (_req, res) => {
  try {
    const data = readJson(DATA_FILE);
    res.json(data.categories || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error leyendo categorías." });
  }
});

app.get("/api/people", (_req, res) => {
  try {
    const data = readJson(DATA_FILE);
    res.json(data.people || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error leyendo gente." });
  }
});

app.get("/api/messages", (_req, res) => {
  try {
    if (!fs.existsSync(MSG_FILE)) writeJson(MSG_FILE, []);
    res.json(readJson(MSG_FILE));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error leyendo mensajes." });
  }
});

app.post("/api/messages", (req, res) => {
  try {
    const { author, text } = req.body || {};
    const cleanAuthor = String(author || "").trim();
    const cleanText = String(text || "").trim();

    if (!cleanAuthor || !cleanText) {
      return res.status(400).json({ error: "Falten 'author' o 'text'." });
    }
    if (cleanAuthor.length > 40) {
      return res.status(400).json({ error: "El nom no pot superar els 40 caràcters." });
    }
    if (cleanText.length > 250) {
      return res.status(400).json({ error: "El missatge no pot superar els 250 caràcters." });
    }

    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();
    const last = lastPost.get(ip);
    if (last && now - last < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (now - last)) / 1000);
      return res.status(429).json({ error: `Espera ${wait}s abans d'enviar un altre missatge.` });
    }
    lastPost.set(ip, now);

    if (!fs.existsSync(MSG_FILE)) writeJson(MSG_FILE, []);
    const messages = readJson(MSG_FILE);
    const msg = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      author: cleanAuthor,
      text: cleanText,
      likes: 0,
      createdAt: new Date().toISOString()
    };
    messages.unshift(msg);
    writeJson(MSG_FILE, messages.slice(0, 200));
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardant el missatge." });
  }
});

app.post("/api/messages/:id/like", (req, res) => {
  try {
    if (!fs.existsSync(MSG_FILE)) writeJson(MSG_FILE, []);
    const messages = readJson(MSG_FILE);
    const idx = messages.findIndex((m) => m.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: "Missatge no trobat." });
    }
    messages[idx].likes = (messages[idx].likes || 0) + 1;
    writeJson(MSG_FILE, messages);
    res.json(messages[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardant el kudo." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Reus Anime escuchando en http://localhost:${PORT}`);
  console.log("Autor: Manuel Casimiro Carrasco");
});
