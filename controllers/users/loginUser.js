const selectUserByEmailQuery = require('../../db/queries/users/selectUserByEmailQuery');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios para logearnos.
    const { email, password } = req.body;

    // Si falta algún campo lanzamos un error.
    if (!email || !password) {
      generateError('Faltan campos.', 400);
    }

    // Localizamos al usuario con el email del body.
    const user = await selectUserByEmailQuery(email);

    // Comprobamos si la contraseña que llega a través del body se corresponde
    // con la contraseña guardada en la base de datos.
    const validPass = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta lanzamos un error.
    if (!validPass) {
      generateError('Contraseña incorrecta.', 401);
    }

    // Generamos un objeto con la información que queremos añadir al token.
    const tokenInfo = {
      id: user.id,
      //role: user.role,
    };

    // Generamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '7d',
    });

    res.send({
      status: 'ok',
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
