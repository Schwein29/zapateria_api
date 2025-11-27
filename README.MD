Uhhhhhhhhhh
la db se restaura con eso:

docker exec -i zapateria_mysql mysql -u root -p zapateria_db < db/zapateria.sql

y luego lo construyen con el clasic:

docker compose up --build

Ah, y pues en el env es lo mismo de siempre, solo q en lugar de localhost es:
MYSQL_HOST= mysql

Luego de eso se accede a localhost:4000
