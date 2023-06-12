const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectServiceByIdQuery = async (serviceId, userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [servicesId] = await connection.query(
      `
                SELECT
                    S.id,
                    S.title,
                    S.description,
                    S.file,
                    U.username,
                    S.userId,
                    S.userId = ? AS owner,
                    S.createdAt,
                FROM services S
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
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
