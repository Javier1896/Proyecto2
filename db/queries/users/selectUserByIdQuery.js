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

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
