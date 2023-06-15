const selectAllServicesQuery = require('../../db/queries/services/selectAllServicesQuery');

const listServices = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const services = await selectAllServicesQuery(keyword, req.user?.id);

    res.send({
      status: 'ok',
      data: {
        services,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listServices;
