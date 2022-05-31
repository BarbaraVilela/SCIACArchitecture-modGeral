const router = require('express').Router();
const CentrosCustosController = require('../controllers/centrosCustos');

 const centrosCustosController = new CentrosCustosController();

 router.get('/', centrosCustosController.get);

 //Cria novo recurso para permitir testes via navegadores
 //TODO: Alterar para comando PUT, na raiz do recurso 'centros-de-custos'
 router.get('/atualiza', centrosCustosController.put);

module.exports = router;