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

        // Si el array de entradas tiene alguna entrada obtenemos sus fotos y convertimos
        // a tipo Number la media de votos.
        /* for (const entry of services) {
            const [photos] = await connection.query(
                `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
                [entry.id]
            );

            // Agregamos las fotos a la entrada.
            entry.photos = photos;

            // Convertimos a Number la media de votos.
            entry.votes = Number(entry.votes);
        } */

        return services;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllServicesQuery;
