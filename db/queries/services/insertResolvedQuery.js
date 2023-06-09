const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertResolvedQuery = async (value, entryId, userId) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el usuario ya ha finalizado la tarea.
    let [resolved] = await connection.query(
      `SELECT id FROM resolvedService WHERE userId = ? AND entryId = ?`,
      [userId, entryId]
    );

    if (resolvedService.length > 0) {
      generateError('Ya has finalizado esta tarea', 403);
    }

    // Marcamos como resuelto.
    await connection.query(
      `INSERT INTO resolvedService(value, entryId, userId, createdAt) VALUES(?, ?, ?, ?)`,
      [value, entryId, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVoteQuery;
