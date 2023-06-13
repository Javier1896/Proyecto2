const getDB = require('../../getDB');

const insertCommentQuery = async (text, fileName, userId, serviceId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    // Insertamos el comentario.
    const [comment] = await connection.query(
      `INSERT INTO comments (text, fileName, userId, serviceId, createdAt) VALUES(?,?,?,?,?)`,
      [text, fileName, userId, serviceId, createdAt]
    );

    return {
      id: comment.insertId,
      text,
      fileName,
      serviceId,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCommentQuery;
