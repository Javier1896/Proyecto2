require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const { newUser, loginUser } = require('./controllers/users');


//Rutas
//Registro de usuario.

app.post('/users', newUser);

// Login de usuario.

app.post('/users/login', loginUser);

//Middleware de 404

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

//Middleware de gestión de errores

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el servidor
const process = require('process');

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor funcionando at http://localhost:${process.env.PORT}!!🐱‍🏍`
  );
});
