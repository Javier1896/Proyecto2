const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectServiceByIdQuery = async (entryId, userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [services] = await connection.query(
      `
                SELECT
                    S.id,
                    S.title,
                    S.description,
                    S.file
                    U.username,
                    S.userId,
                    S.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS ,
                    S.createdAt
                FROM services S
                INNER JOIN users U ON U.id = E.userId
                LEFT JOIN services V ON E.id = V.serviceId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
      [userId, serviceId]
    );

    // Si no hay entradas lanzamos un error.
    if (services.length < 1) {
      generateError('Entrada no encontrada', 404);
    }

    // Llegados a este punto sabemos que existe una entrada y que está en la
    // posición 0 del array. Vamos a obtener los archivos (si tiene).
    const [files] = await connection.query(
      `SELECT id, name FROM servicesFiles WHERE entryId = ?`,
      [entries[0].id]
    );

    // Devolvemos los datos de la entrada junto a sus fotos.
    return {
      ...services[0],
      files,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectServiceByIdQuery;
