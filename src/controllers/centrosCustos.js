const centrosCustosServices = require('../services/centrosCustos');

class CentrosCustosController {

    get(req, res) {
        return res.status(200)
            .send(centrosCustosServices.getAll())
    };

    put(req, res) {

        try {
            centrosCustosServices.updateAll();
            return res.status(200);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    };

}
module.exports = CentrosCustosController;
