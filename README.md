# Reus Anime Cyberpunk

Proyecto containerizado con Docker que muestra un perfil de desarrollador de Reus y Tarragona con estética anime/cyberpunk.

## Stack
- Backend: Node.js + Express (puerto 5000)
- Frontend: React + Vite servido por Nginx (puerto 80 en contenedor)
- Orquestación: Docker Compose

## Arranque

    docker compose up --build

- Frontend: http://localhost:3000
- Backend:  http://localhost:5000/api/data
