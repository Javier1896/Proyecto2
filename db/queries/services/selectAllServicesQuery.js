const getDB = require('../../getDB');

const selectAllServicesQuery = async (keyword = '', userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [services] = await connection.query(
      `
                SELECT
                    S.id,
                    S.title,
                    S.description,
                    U.username,
                    S.userId,
                    S.userId = ? AS owner,
                    S.createdAt
                FROM services S
                INNER JOIN users U ON U.id = S.userId
                WHERE S.title LIKE ? OR S.description LIKE ?
                GROUP BY S.id
                ORDER BY S.createdAt DESC
            `,
      [userId, `%${keyword}%`, `%${keyword}%`]
    );

    return services;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllServicesQuery;
