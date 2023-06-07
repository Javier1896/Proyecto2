# Fiverdona

Plataforma que permita gestionar una web donde personas que necesiten algún servicio digital puedan pedir ayuda a otros usuarios.

## Entidades

### users:

    id
    name
    email
    password
    avatar
    createdAt

### services:

    id
    title
    description
    file
    resolved
    createdAt

### comments:

    id
    text
    serviceId
    userId
    fileName
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
