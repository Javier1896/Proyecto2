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
                    C.text
                    C.fileName
                    C.serviceId
                    U.username,
                    C.createdAt
    
    
                FROM services S
                INNER JOIN users U ON U.id = S.userId
                WHERE S.id = ?
                GROUP BY C.id
                ORDER BY C.createdAt DESC
            `,
      [userId, serviceId]
    );

    // Si no hay información lanzamos un error.
    if (services.length < 1) {
      generateError('Entrada no encontrada', 404);
    }

    // Llegados a este punto sabemos que existe una entrada y que está en la
    // posición 0 del array. Vamos a obtener la información(si tiene).
    const [service] = await connection.query(
      `SELECT id, name FROM service WHERE serviceId = ?`,
      [services[0].id]
    );

    // Devolvemos los datos del servicio
    return {
      ...services[0],
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectServiceByIdQuery;
