const router = require('express').Router(),
    centroCustoRoutes = require('./centrosCustos');

router.use('/centros-de-custos', centroCustoRoutes);
router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;