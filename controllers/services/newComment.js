const insertCommentQuery = require('../../db/queries/services/insertServiceQuery');

const { generateError } = require('../../helpers');

const newComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      generateError('Faltan campos', 400);
    }

    const comment = await insertCommentQuery(text, req.service.id);

    res.send({
      status: 'ok',
      data: {
        comment: { ...comment },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newComment;
