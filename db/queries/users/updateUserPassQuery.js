const getDB = require('../../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const updateUserPassQuery = async (currentPass, newPass, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT password FROM users WHERE id = ?`,
      [userId]
    );

    //Comprobamos si es correcta la contraseña actual.
    const validPass = await bcrypt.compare(currentPass, users[0].password);

    // Si no hay ningún usuario con ese código de recuperación lanzamos un error.
    if (!validPass) {
      generateError('Contraseña incorrecta.', 401);
    }

    // Encriptamos la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPass, 10);

    // Actualizamos el usuario.
    await connection.query(
      `UPDATE users SET password = ?, modifiedAt = ? WHERE id = ?`,
      [hashedPass, new Date(), userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserPassQuery;
