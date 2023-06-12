const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const updateUserQuery = async (email, username, userId) => {
    let connection;

    try {
        connection = await getDB();

        // Buscamos en la base de datos algún usuario ese email.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ? AND id NOT LIKE ? `,
            [email, userId]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            generateError('Ya existe un usuario con ese email', 403);
        }

        // Buscamos en la base de datos algún usuario ese nombre de usuario.
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ? AND id NOT LIKE ?`,
            [username, userId]
        );

        // Si existe algún usuario con ese nombre de usuario lanzamos un error.
        if (users.length > 0) {
            generateError(
                'Ya existe un usuario con ese nombre de usuario',
                403
            );
        }

        await connection.query(
            `UPDATE users SET email = ?, username = ?, modifiedAt = ? WHERE id = ?`,
            [email, username, new Date(), userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserQuery;
