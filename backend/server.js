const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_FILE = path.join(__dirname, "data", "db.json");
const MSG_FILE = path.join(__dirname, "data", "messages.json");

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
    if (!author || !text) {
      return res.status(400).json({ error: "Faltan 'author' o 'text'." });
    }
    if (author.length > 40 || text.length > 280) {
      return res.status(400).json({ error: "Máx 40 caracteres de autor y 280 de texto." });
    }
    if (!fs.existsSync(MSG_FILE)) writeJson(MSG_FILE, []);
    const messages = readJson(MSG_FILE);
    const msg = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      author: String(author).trim(),
      text: String(text).trim(),
      createdAt: new Date().toISOString()
    };
    messages.unshift(msg);
    writeJson(MSG_FILE, messages.slice(0, 200));
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando mensaje." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Reus Anime escuchando en http://localhost:${PORT}`);
  console.log("Autor: Manuel Casimiro Carrasco");
});
