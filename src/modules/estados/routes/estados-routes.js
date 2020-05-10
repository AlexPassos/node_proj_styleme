'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/estados-controller');

router.get('/styleme/listEstados', controller.getEstados);

module.exports = router;