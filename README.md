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
| Estilos | CSS puro, sin frameworks (glassmorphism, neon, 3D) |
| Persistencia | JSON en disco (`messages.json`) |

---

## 🚀 Cómo levantarlo

### Requisitos

- Docker
- Docker Compose

### Un solo comando

```bash
docker compose up --build
