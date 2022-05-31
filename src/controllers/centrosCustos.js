const CentrosCustosServices = require('../services/centrosCustos');

const centrosCustosServices = new CentrosCustosServices();

class CentrosCustosController {

    get(req, res) {
        return res.status(200)
        .send(centrosCustosServices.getAll())
    };

    put(req, res) {
        return res.status(200)
        .send(centrosCustosServices.updateAll())
    };

}
module.exports = CentrosCustosController;
