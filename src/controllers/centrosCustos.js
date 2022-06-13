const centrosCustosServices = require('../services/centrosCustos');

class CentrosCustosController {

    get(req, res) {
        return res.status(200)
            .send(centrosCustosServices.getAll())
    };

    put(req, res) {
        console.log("Recebida requisição de update dos centros de custos");

        try {
            centrosCustosServices.updateAll();
            return res.status(200);
        } catch (error) {
            console.log("Ocorreu um erro ao atualizar os centros de custos" + error.message);
            return res.status(500);
        }
    };

}
module.exports = CentrosCustosController;
