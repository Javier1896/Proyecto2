const insertCommentQuery = require('../../db/queries/services/InsertCommentQuery');
const selectServiceByIdQuery = require('../../db/queries/services/selectServiceByIdQuery');

const { generateError, saveFile } = require('../../helpers');

const addComment = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const { text } = req.body;

    const service = await selectServiceByIdQuery(req.user.id);

    // Si eres el autor del servicio lanzamos un error.
    if (service.owner) {
      generateError(
        'No puedes comentar esta tarea, porque eres el autor.',
        403
      );
    }

    let fileName;

    if (req.files?.file) {
      fileName = await saveFile(req.files.file);
    }
    // Guardamos el comentario en la base de datos.
    await insertCommentQuery(text, req.user.id, fileName, serviceId);

    res.send({
      status: 'ok',
      message: 'Comentario guardado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addComment;
