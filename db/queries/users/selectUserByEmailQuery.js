const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
    let connection;

    try {
        connection = await getDB();

        // Localizamos al usuario con el email que venga como argumento.
        const [users] = await connection.query(
            `SELECT id, password FROM users WHERE email = ?`,
            [email]
        );

        // Si el array de usuarios está vacío quiere decir que no hay usuarios con ese email.
        if (users.length < 1) {
            generateError('Usuario no encontrado', 404);
        }

        // Dado que no puede existir más de un usuario con el mismo email, en caso de que en el
        // array de usuarios haya un usuario estará en la posición 0.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailQuery;
