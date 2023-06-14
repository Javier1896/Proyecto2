const selectServiceByIdQuery = require('../../db/queries/services/selectServiceByIdQuery');

const getService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await selectServiceByIdQuery(serviceId, req.user?.id);

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

module.exports = getService;
