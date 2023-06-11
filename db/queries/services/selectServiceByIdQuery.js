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
                    C.text
                    C.serviceId
                    C.fileName
                    U.username,
                    C.userId,
                    C.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    E.createdAt
    
    
                FROM services S
                INNER JOIN users U ON U.id = C.userId
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
      [userId]
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
