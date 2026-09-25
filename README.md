# 🌸 Reus Anime Cyberpunk

**Panel interactivo que convierte Reus y Tarragona en un universo RPG navegable con estética anime/cyberpunk.**

Proyecto personal de [Manuel Casimiro Carrasco (@urukaisk-maker)](https://github.com/urukaisk-maker), desarrollador full stack afincado en Reus con base operativa en Tarragona.

---

## 🎯 Qué es

Un panel web que reinterpreta los rincones emblemáticos de Reus y Tarragona como zonas de un videojuego de rol. Cada lugar real se convierte en una carta gacha con nivel, poder, rareza y recompensa.

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
| Estilos | CSS puro |
| Persistencia | JSON en disco |

---

## 🚀 Cómo levantarlo

Requisitos: Docker y Docker Compose.

Ejecuta `docker compose up --build` en la raíz. Espera 1-3 minutos.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000/health

Para parar: `docker compose down`.

---

## 🎮 Funcionalidades

### Navegación

- 5 pestañas: Zones · Missions · Inventory · Codex · Mur
- 3 páginas internas: Portfolio · Aviso Legal · Privacidad

### Zones

- 10 zonas con foto real
- Modal holográfico 3D al clicar
- Badges de tipo (SPAWN / DUNGEON / GUILD / LAB / SHOP / VISTA)
- Búsqueda + filtros por región

### Missions

- 9 misiones con barra de progreso
- Búsqueda + filtros por dificultad

### Inventory

- 10 objetos con iconos emoji
- Rareza por color (R / SR / SSR)
- Búsqueda + filtros por rareza

### Codex

- 5 categorías culturales
- 13 personajes históricos
- Búsqueda en tiempo real

### Mur

- Validación + cooldown anti-spam de 20s por IP
- Sistema de kudos con persistencia local
- Sonido de éxito

### Extras sensoriales

- CyberRain: lluvia canvas de kanji + binario
- Audio FX: clics con Web Audio API
- Music toggle: radio lofi synthwave
- Ticker narrativo con frases rotando

---

## 📁 Estructura

    reus-anime-project/
    ├── docker-compose.yml
    ├── README.md
    ├── backend/
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── server.js
    │   └── data/
    │       ├── db.json
    │       └── messages.json
    └── frontend/
        ├── Dockerfile
        ├── nginx.conf
        ├── package.json
        ├── vite.config.js
        ├── index.html
        ├── public/img/
        └── src/
            ├── App.jsx
            ├── components/
            ├── pages/
            ├── utils/
            └── styles/

---

## 🌐 API

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /health | Estado del servicio |
| GET | /api/data | Todos los datos |
| GET | /api/locations/:id | Una zona |
| GET | /api/categories | Categorías |
| GET | /api/people | Personajes |
| GET | /api/messages | Mensajes |
| POST | /api/messages | Enviar mensaje |
| POST | /api/messages/:id/like | Dar kudo |

---

## 🎨 Paleta

| Color | Uso |
|---|---|
| #ff2ec4 neon-pink | Hero, SSR |
| #9d4edd neon-purple | Bordes, SR |
| #00f0ff neon-cyan | Enlaces, R |
| #b8ff3a neon-lime | Recompensas |
| #03000a bg-0 | Fondo base |

Tipografías: Orbitron (display) + Rajdhani (texto).

---

## 📜 Legal

Proyecto personal sin ánimo de lucro. Las marcas y referencias culturales citadas pertenecen a sus respectivos titulares y se usan con finalidad divulgativa.

---

## 👤 Autor

**Manuel Casimiro Carrasco** · [@urukaisk-maker](https://github.com/urukaisk-maker)

Creado bajo la sombra del Campanar de Sant Pere, alimentado a base de vermut y commits limpios.
