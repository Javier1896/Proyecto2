const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');
const editUserSchema = require('../../schemas/editUserSchema');
const updateUserQuery = require('../../db/queries/users/updateUserQuery');

const { generateError, validateSchema } = require('../../helpers');

const editUserEmail = async (req, res, next) => {
    try {
        let { email, username } = req.body;

        if (!email && !username) {
            generateError('Faltan campos', 400);
        }

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdQuery(req.user.id);

        await validateSchema(editUserSchema, req.body);

        // En caso de que el usuario no haya enviado email o nombre de usuario, establezco
        // como valor por defecto lo que haya guardado en la base de datos.
        email = email || user.email;
        username = username || user.username;

        // Actualizamos los datos del usuario.
        await updateUserQuery(email, username, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserEmail;
