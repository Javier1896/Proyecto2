const joi = require('joi');

const editUserPassSchema = joi.object().keys({
  currentPass: joi
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña.');

        case 'string.pattern.base':
          return new Error(
            'La contraseña actual debe tener al menos una letra mayúscula, una letra minúscula y un signo de puntuación.'
          );

        default:
          return new Error(
            'La contraseña actual debe tener entre 8 y 100 caracteres.'
          );
      }
    }),

  newPass: joi
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña.');

        case 'string.pattern.base':
          return new Error(
            'La contraseña nueva debe tener al menos una letra mayúscula, una letra minúscula y un signo de puntuación.'
          );

        default:
          return new Error(
            'La contraseña nueva debe tener entre 8 y 100 caracteres.'
          );
      }
    }),
});

module.exports = editUserPassSchema;
