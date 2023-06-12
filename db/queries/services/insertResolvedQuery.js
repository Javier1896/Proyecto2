const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertResolvedQuery = async (value, serviceId, userId) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el usuario ya ha finalizado la tarea.
    let [resolvedService] = await connection.query(
      `SELECT id FROM resolvedService WHERE userId = ? AND serviceId = ?`,
      [userId, entryId]
    );

    if (resolvedService.length > 0) {
      generateError('Ya has finalizado esta tarea', 403);
    }

    // Marcamos como resuelto.
    await connection.query(
      `INSERT INTO resolvedService(value, serviceId, userId, createdAt) VALUES(?, ?, ?, ?)`,
      [value, serviceId, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertResolvedQuery;
