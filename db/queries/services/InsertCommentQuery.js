const getDB = require('../../getDB');

const insertCommentQuery = async (text, userId, fileName, serviceId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [comment] = await connection.query(
      `INSERT INTO comments(text, userId, fileName, serviceId, createdAt) VALUES(?, ?, ?, ?, ?)`,
      [text, userId, fileName, serviceId, createdAt]
    );

    return {
      id: comment.insertId,
      text,
      userId,
      fileName: fileName || null,
      serviceId: Number(serviceId),
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCommentQuery;
