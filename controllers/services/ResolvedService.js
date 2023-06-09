const selectServiceByIdQuery = require('../../db/queries/entries/selectServiceByIdQuery');
const insertResolvedQuery = require('../../db/queries/entries/insertResolvedQuery');

const { generateError } = require('../../helpers');

const resolvedService = async (req, res, next) => {
  try {
    const { entryId } = req.params;

    const { value } = req.body;

    const entry = await selectServiceByIdQuery(entryId, req.user.id);

    // Si no somos los dueños del servicio lanzamos un error.
    if (!entry.owner) {
      generateError('No puedes finalizar otra tarea', 403);
    }

    // Finalizamos la tarea.
    const resolvedsAvg = await insertResolvedQuery(value, entryId, req.user.id);

    res.send({
      status: 'ok',
      data: {
        entry: {
          id: Number(entryId),
          votes: Number(votesAvg),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = voteEntry;
