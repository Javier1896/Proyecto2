const getDB = require('../../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const insertUserQuery = async (email, username, password) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el email está repetido.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (users.length > 0) {
      generateError('Ya existe un usuario con ese email.', 403);
    }

    // Comprobamos si el nombre de usuario está repetido.
    [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );

    if (users.length > 0) {
      generateError('Nombre de usuario no disponible.', 403);
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO users (email, username, password, createdAt) VALUES(?, ?, ?, ?)`,
      [email, username, hashedPass, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
