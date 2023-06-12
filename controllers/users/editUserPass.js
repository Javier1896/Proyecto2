const updateUserPassQuery = require('../../db/queries/users/updateUserPassQuery');
const editUserPassSchema = require('../../schemas/editUserPassSchema');
const { generateError, validateSchema } = require('../../helpers');

const editUserPass = async (req, res, next) => {
    try {
        const { currentPass, newPass } = req.body;

        if (!currentPass || !newPass) {
            generateError('Faltan campos', 400);
        }
        await validateSchema(editUserPassSchema, req.body);
        await updateUserPassQuery(currentPass, newPass, req.user.id);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserPass;
