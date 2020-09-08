'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/usuarios-controller');

router.get('/styleme/usuarios/listUsuarios', controller.getUsuarios);
router.get('/styleme/usuarios/usuario/:id', controller.getUsuario);
router.post('/styleme/usuarios/saveUsuarios', controller.salvaUsuarios);
router.post('/styleme/usuarios/updateUsuarios', controller.updateUsuarios);
router.get('/styleme/usuarios/emailCadastrado/:email', controller.getEmailCadastro);

module.exports = router;