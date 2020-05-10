'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/profissional-controller');

router.get('/styleme/profissional/listProfissional', controller.getProfissional);
router.get('/styleme/profissional/emailCadastrado/:email', controller.getEmailCadastro);
router.post('/styleme/profissional/updateProfissional', controller.updateProfissional);
router.post('/styleme/profissional/atualizaProfissional', controller.atualizaProfissional);
//router.delete('/deleteSetor', controller.delete);

module.exports = router;