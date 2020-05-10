'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/tabela-controller');

router.get('/styleme/tabela/listTabela/:id', controller.getTabela);
router.post('/styleme/tabela/updateTabela', controller.updateTabela);
//router.post('/updateSetor', controller.update);
//router.delete('/deleteSetor', controller.delete);

module.exports = router;