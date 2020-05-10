'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/cabeleireiros-controller');

router.get('/styleme/cabeleireiros/listCabeleireiros/:codigo', controller.getCabeleireiros);
router.post('/styleme/cabeleireiros/saveCabeleireiros', controller.saveCabeleireiros);
router.post('/styleme/cabeleireiros/updateCabeleireiros', controller.updateCabeleireiros);
router.delete('/styleme/cabeleireiros/deleteCabeleireiro', controller.deleteCabeleireiros);

module.exports = router;