const getDB = require('../../getDB');

const selectUserByIdQuery = async (userId) => {
    let connection;

    try {
        connection = await getDB();

        // Localizamos al usuario con el id establecido.
        const [users] = await connection.query(
            `SELECT id, username, email, avatar, createdAt FROM users WHERE id = ?`,
            [userId]
        );

        // El array de usuarios solo podrá contener a un usuario dado que hemos establecido
        // como regla que el email no puede repetirse más de una vez. Devolvemos al usuario
        // que estará en la posición cero.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
