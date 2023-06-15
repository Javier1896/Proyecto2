# Fiverdona

Plataforma que permite gestionar una web donde usuarios que necesitan algún servicio digital puedan pedir ayuda a otros usuarios.

#Cómo se pone a funcionar:
-En el fichero .env debemos rellenar con nuestros datos los campos que aparecen.
-Escribir en la terminal el comando: npm install para instalar todas las dependencias del package.json
-Crear la base de datos en mySQL con el comando: CREATE DATABASE IF NOT EXISTS fiverdona.
-Ejecutar en la terminal el comando: node ./db/initDB.js para poder crear las tablas necesarias para almacenar los datos en el Workbench.
-Inicializar el servidor con el comando: npm run dev.
-En Postman importar el archivo Fiverdona.postman_collection.json para poder probar los diferentes endpoints e ir almacenando la información en la base de datos.

## Entidades

### users:

    id
    username
    email
    password
    avatar
    createdAt
    modifiedAt

### services:

    id
    title
    description
    fileName
    resolved
    userId
    createdAt

### comments:

    id
    text
    userId
    fileName
    serviceId
    createdAt

## Endpoints

### Usuarios:

- POST [/users/register] - Registro de un nuevo usuario.
- POST [/users/login] - Permite logear un usuario.
- GET [/users] - Devuelve informacion de mi propio usuario. Token.
- PUT [/users/avatar] - Cambia el avatar de un usuario. Token.

### Servicios:

- POST [/services] - Registro de un nuevo servicio. Puede incluir un archivo. Token.
- GET [/services] - Lista todos los servicios. Permite filtrar servicios por palabra clave (opcional).
- GET [/services/:serviceId] - Ofrece informacion detallada de un servicio junto a sus comentarios.
- PUT [/services/:serviceId/resolved] - Marca un servicio como completado. Token.
- POST [/services/:serviceId/comments] - Crea un nuevo comentario en un servicio. Puede incluir un archivo. Token.
