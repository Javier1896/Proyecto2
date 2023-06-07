const getDB = require('../../getDB');

const insertPhotoQuery = async (photoName, userId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [photo] = await connection.query(
      `INSERT INTO entryPhotos(name, userId, createdAt) VALUES(?, ?, ?)`,
      [photoName, userId, createdAt]
    );

    return {
      id: photo.insertId,
      name: photoName,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoQuery;
