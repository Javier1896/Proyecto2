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

    if (users.length < 1) {
      generateError('Usuario no encontrado.', 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
