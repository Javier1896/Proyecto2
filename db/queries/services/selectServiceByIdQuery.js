const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectServiceByIdQuery = async (serviceId, userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [services] = await connection.query(
      `
                SELECT
                    S.id,
                    S.title,
                    S.description,
                    S.fileName
                    S.resolved
                    S.userId,
                    S.userId = ? AS owner,
                    U.username,
                    
                FROM services S
                INNER JOIN users U ON U.id = S.userId
                WHERE S.id = ?
            `,
      [userId, serviceId]
    );

    // Si no hay información lanzamos un error.
    if (services.length < 1) {
      generateError('Entrada no encontrada', 404);
    }

    const [comments] = await connection.query(
      `SELECT * FROM comments WHERE serviceId = ?`,
      [services[0].id]
    );

    // Devolvemos los datos del servicio
    return {
      ...services[0],
      comments,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectServiceByIdQuery;
