require('dotenv').config();

const getDB = require('./getDB');

const main = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Borrando tablas...');

    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS services');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas...');

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS services (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                fileName VARCHAR(100),
                resolved BOOLEAN DEFAULT false,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                text VARCHAR(500) NOT NULL,
                userId INT UNSIGNED NOT NULL,
                fileName VARCHAR(100),
                serviceId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (serviceId) REFERENCES services(id)
            )
        `);

    console.log('¡Tablas creadas!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
