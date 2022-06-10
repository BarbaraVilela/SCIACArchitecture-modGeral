const router = require('express').Router();
const CentrosCustosController = require('../controllers/centrosCustos');

 const centrosCustosController = new CentrosCustosController();

 router.get('/', centrosCustosController.get);
 router.put('/', centrosCustosController.put);

module.exports = router;