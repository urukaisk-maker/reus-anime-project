#!/usr/bin/env bash
set -e
cd ~/reus-anime-project

# ---------- README completo ----------
cat > README.md <<'README_END_MARKER'
# 🌸 Reus Anime Cyberpunk

**Panel interactivo que convierte Reus y Tarragona en un universo RPG navegable con estética anime/cyberpunk.**

Proyecto personal de [Manuel Casimiro Carrasco (@urukaisk-maker)](https://github.com/urukaisk-maker), desarrollador full stack afincado en Reus con base operativa en Tarragona.

---

## 🎯 Qué es

Un panel web que reinterpreta los rincones emblemáticos de Reus y Tarragona como zonas de un videojuego de rol. Cada lugar real se convierte en una carta gacha con nivel, poder, rareza y recompensa. La historia, la cultura popular y la gastronomía del Baix Camp se despliegan en forma de misiones, inventario y codex.

**Zonas incluidas:**

- Plaça de Prim (spawn)
- Campanar de Sant Pere (dungeon)
- Casa Navàs (guild)
- Gaudí Centre (lab)
- Mercat Central de Reus (shop)
- Santuari de Misericòrdia (spawn sagrat)
- Teatre Fortuny (lab)
- Amfiteatre de Tarraco (dungeon)
- Balcó del Mediterrani (vista)
- Catedral de Tarragona (guild)

---

## ⚙️ Stack

| Capa | Tecnología |
|---|---|
| Backend | Node.js 20 · Express · CORS |
| Frontend | React 18 · Vite 5 · Nginx |
| Contenedores | Docker · Docker Compose |
| Estilos | CSS puro, sin frameworks |
| Persistencia | JSON en disco (messages.json) |

---

## 🚀 Cómo levantarlo

### Requisitos

- Docker
- Docker Compose

### Un solo comando

Ejecuta `docker compose up --build` en la raíz del proyecto.

Espera 1-3 minutos la primera vez. Luego:

- **Frontend:** http://localhost:3000
- **Backend directo:** http://localhost:5000/health

### Parar

Ejecuta `docker compose down`.

---

## 🎮 Funcionalidades

### Navegación

- **5 pestañas:** Zones · Missions · Inventory · Codex · Mur
- **3 páginas internas:** Portfolio · Aviso Legal · Privacidad

### Zones

- 10 zonas con foto real
- Modal holográfico 3D al clicar una carta
- Badges de tipo (SPAWN / DUNGEON / GUILD / LAB / SHOP / VISTA)
- Búsqueda + filtros por región (Reus / Tarragona)

### Missions

- 9 misiones con barra de progreso animada
- Búsqueda + filtros por dificultad

### Inventory

- 10 objetos con iconos emoji
- Rareza por color (R / SR / SSR)
- Búsqueda + filtros por rareza

### Codex

- 5 categorías culturales con subcategorías desplegables
- 13 personajes históricos
- Búsqueda en tiempo real que abre automáticamente las categorías con coincidencias

### Mur

- Formulario con validación (nombre máx 40, texto máx 250)
- Cooldown anti-spam de 20 segundos por IP
- Sistema de kudos con persistencia local
- Sonido de éxito al enviar

### Extras sensoriales

- **CyberRain:** lluvia canvas de kanji + binario de fondo
- **Audio FX:** clics y confirmaciones con Web Audio API (sin archivos)
- **Music toggle:** radio lofi synthwave con un clic
- **Ticker narrativo:** frases otaku rotando cada 6,5s

---

## 📁 Estructura
