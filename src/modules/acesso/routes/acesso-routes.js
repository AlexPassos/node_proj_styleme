'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/acesso-controller');

router.post('/styleme/autenticacao', controller.postAutenticacao);
router.get('/styleme/autenticacao/recemail/:email', controller.getAutenticacaoEmail);
router.get('/styleme/acesso/updateLogin/:login', controller.updateLogin);
router.post('/styleme/acesso/emailrecuperacao', controller.emailRecuperacao);

module.exports = router;