const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');
const updateUserAvatarQuery = require('../../db/queries/users/updateUserAvatarQuery');

const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editUserAvatar = async (req, res, next) => {
  try {
    if (!req.files?.avatar) {
      generateError('Faltan campos.', 400);
    }

    // Obtenemos los datos del usuario para comprobar si ya tiene un avatar previo.
    const user = await selectUserByIdQuery(req.user.id);

    // Si el usuario tiene un avatar previo lo eliminamos.
    if (user.avatar) {
      await deletePhoto(user.avatar);
    }

    // Guardamos el avatar en una carpeta del servidor y obtenemos el nombre con el que lo hemos
    // guardado.
    const avatar = await savePhoto(req.files.avatar, 100);

    await updateUserAvatarQuery(avatar, req.user.id);

    res.send({
      status: 'ok',
      message: 'Avatar actualizado.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserAvatar;
