const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateError('Falta la cabecera de autenticación.', 401);
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      generateError('Token inválido.', 401);
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
