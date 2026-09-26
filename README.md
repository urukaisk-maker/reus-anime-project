# 🌸 Reus & Tarragona · Anime Cyberpunk Edition 🎮

> "No hago software para las masas: hago software para las personas."
> — Manuel Casimiro Carrasco, Reus

Panel web interactivo que transforma las calles, monumentos e historia del Baix Camp y Tarraco en un universo RPG de neón y misiones.

---

## ⚡ Stack

- Frontend: React · Vite · Nginx · CSS cyberpunk propio
- Backend: Node.js · Express · API REST con persistencia JSON
- Infraestructura: Docker · Docker Compose

---

## 🗺️ Contenido

- 10 zonas reales con foto (Plaça de Prim, Campanar de Sant Pere, Casa Navàs, Gaudí Centre, Amfiteatre de Tarraco, etc.)
- 9 misiones de desarrollador con barra de progreso
- 10 objetos legendarios (Vermut, Avellana, Mulassa, Drac…)
- 5 categorías culturales + 13 personajes históricos
- Muro público con kudos y cooldown anti-spam
- Modal holográfico 3D, CyberRain, audio FX y música lofi

---

## 🚀 Arrancar en local

Necesitas Docker y Docker Compose.

Clona el repo:

    git clone https://github.com/urukaisk-maker/reus-anime-project.git
    cd reus-anime-project

Levanta todo:

    sudo docker compose up --build

Abre:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/data

Parar:

    sudo docker compose down

Ver logs en vivo:

    sudo docker compose logs -f

---

## 📁 Estructura

    reus-anime-project/
    ├── backend/         Express + db.json + messages.json
    ├── frontend/        React + Vite + Nginx
    ├── docker-compose.yml
    └── README.md

---

## 🌐 API

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /health | Estado del servicio |
| GET | /api/data | Todos los datos |
| GET | /api/locations/:id | Una zona |
| GET | /api/categories | Categorías |
| GET | /api/people | Personajes |
| GET | /api/messages | Mensajes del muro |
| POST | /api/messages | Enviar mensaje |
| POST | /api/messages/:id/like | Dar kudo |

---

## 👤 Autor

Manuel Casimiro Carrasco · [@urukaisk-maker](https://github.com/urukaisk-maker)

Hecho con cariño, código limpio y vermut desde Reus. 🐙
