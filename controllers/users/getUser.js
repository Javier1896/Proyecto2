const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Obtenemos el usuario.
        const user = await selectUserByIdQuery(userId);

        // Dado que dentro de la función anterior no estamos lanzando un error en caso de que el usuario
        // no exista (lo hacemos con userExists pero aquí no viene al caso) lanzamos un error a continuación.
        if (!user) {
            generateError('Usuario no encontrado', 404);
        }

        // Eliminamos el email dado que es un dato de caracter personal.
        delete user.email;

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUser;
