const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // Si falta el token lanzamos un error.
        if (!authorization) {
            generateError('Falta la cabecera de autenticación', 401);
        }

        // Variable que almacenará la info del token una vez desencriptada.
        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch {
            generateError('Token inválido', 401);
        }

        // Creamos una propiedad inventada por nosotros en el objeto request para añadir
        // los datos del usuario.
        req.user = tokenInfo;

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
