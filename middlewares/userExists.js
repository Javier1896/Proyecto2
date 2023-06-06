const getDB = require('../db/getDB');

const { generateError } = require('../helpers');

const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [req.user.id]
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            generateError('Usuario no encontrado', 404);
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
