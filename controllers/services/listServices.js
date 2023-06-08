const selectAllServicesQuery = require('../../db/queries/services/selectAllServicesQuery');

const listServices = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        // Dado que la propiedad user puede no existir lo indicamos por medio de la interrogación.
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