const selectServiceByIdQuery = require('../../db/queries/services/selectServiceByIdQuery');
const insertResolvedQuery = require('../../db/queries/services/insertResolvedQuery');

const { generateError } = require('../../helpers');

const resolvedService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const { value } = req.body;

    const service = await selectServiceByIdQuery(serviceId, req.user.id);

    // Si no somos los dueños del servicio lanzamos un error.
    if (!service.owner) {
      generateError('No puedes finalizar otra tarea', 403);
    }

    // Finalizamos la tarea.
    const resolvedsAvg = await insertResolvedQuery(
      value,
      serviceId,
      req.user.id
    );

    res.send({
      status: 'ok',
      data: {
        entry: {
          id: Number(serviceId),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = resolvedService;
