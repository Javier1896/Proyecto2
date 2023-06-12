const joi = require('joi');

const editUserSchema = joi.object().keys({
    email: joi
        .string()
        .email()
        .error((errors) => {
            if (errors[0].code === 'any.required') {
                return new Error('Se requiere un email');
            } else {
                return new Error('El email no es válido');
            }
        }),
    username: joi.string()
    
});

module.exports = editUserSchema;
