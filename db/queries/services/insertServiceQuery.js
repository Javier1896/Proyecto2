const getDB = require('../../getDB');

const insertServiceQuery = async (title, description, fileName, userId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    // Insertamos el servicio.
    const [service] = await connection.query(
      `INSERT INTO services (title, description, fileName, userId, createdAt) VALUES(?,?,?,?,?)`,
      [title, description, fileName, userId, createdAt]
    );

    return {
      id: service.insertId,
      title,
      description,
      fileName,
      resolved: false,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertServiceQuery;
