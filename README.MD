# Zapateria API

## Requisitos
- Docker
- Docker Compose

## Instrucciones
1. Clonar el repositorio
2. Crear un archivo .env usando:
    PORT = 4000
    MYSQL_HOST= mysql
    MYSQL_USER= root
    MYSQL_PASSWORD= 
    MYSQL_DB= zapateria_db
3. Levantar los contenedores:
   docker compose up --build
4. Acceder a la API
   http://localhost:4000

