'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/registros-controller');

router.get('/styleme/registros/listRegistros/:id', controller.getRegistros);
router.post('/styleme/registros/emailvalidacao', controller.postEmailValidacao);
router.get('/styleme/registros/loginCadastrado/:login', controller.getLoginCadastro);
router.post('/styleme/registros/profissional', controller.postRegistrarProfissional);
router.post('/styleme/registros/usuario', controller.postRegistrarUsuario);

module.exports = router;