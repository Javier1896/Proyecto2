const { generateError, saveFile } = require('../../helpers');

const insertServiceQuery = require('../../db/queries/services/insertServiceQuery');

const newService = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      generateError('Faltan campos.', 400);
    }

    let fileName;

    if (req.files?.file) {
      fileName = await saveFile(req.files.file);
    }

    const service = await insertServiceQuery(
      title,
      description,
      fileName,
      req.user.id
    );

    res.send({
      status: 'ok',
      data: {
        service,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newService;
