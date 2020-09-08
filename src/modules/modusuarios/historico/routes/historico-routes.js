'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/historico-controller');

router.get('/styleme/historico/listHistorico/:id', controller.getHistorico);
router.get('/styleme/historico/verHistorico/:id', controller.getVerificarHistorico);

module.exports = router;