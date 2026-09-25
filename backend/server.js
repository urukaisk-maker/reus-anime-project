const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "data", "db.json");

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "reus-anime-backend", author: "Manuel Casimiro Carrasco" });
});

app.get("/api/data", (_req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error("Error leyendo db.json:", err);
    res.status(500).json({ error: "No se pudo leer la base de datos." });
  }
});

app.get("/api/locations/:id", (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    const loc = data.locations.find((l) => l.id === req.params.id);
    if (!loc) return res.status(404).json({ error: "Localización no encontrada." });
    res.json(loc);
  } catch (err) {
    console.error("Error leyendo db.json:", err);
    res.status(500).json({ error: "No se pudo leer la base de datos." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Reus Anime escuchando en http://localhost:${PORT}`);
  console.log("Autor: Manuel Casimiro Carrasco");
});
