const getDB = require('../../getDB');

const deletePhotoQuery = async (photoId) => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(`DELETE FROM entryPhotos WHERE id = ?`, [
            photoId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deletePhotoQuery;
