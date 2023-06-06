//const [error] = require('console');

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};


// Validate Schema.

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    err.httpStatus = 400;
    throw err;
    
  }
};

module.exports = {
  generateError,
  validateSchema,
};