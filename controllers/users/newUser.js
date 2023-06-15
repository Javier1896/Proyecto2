const insertUserQuery = require('../../db/queries/users/insertUserQuery');
const newUserSchema = require('../../schemas/newUserSchema');
const { /* generateError, */ validateSchema } = require('../../helpers');

const newUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    //Validamos los datos del body con joi.

    await validateSchema(newUserSchema, req.body);

    await insertUserQuery(email, username, password);

    res.send({
      status: 'ok',
      message: 'Usuario creado.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
