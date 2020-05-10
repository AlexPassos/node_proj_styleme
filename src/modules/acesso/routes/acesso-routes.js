'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/acesso-controller');

router.post('/styleme/autenticacao', controller.postAutenticacao);
router.get('/styleme/acesso/updateLogin/:login', controller.updateLogin);

module.exports = router;