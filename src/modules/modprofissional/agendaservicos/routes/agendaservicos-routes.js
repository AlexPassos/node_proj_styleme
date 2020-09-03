'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/agendaservicos-controller');

router.get('/styleme/agendaservicos/listAgendaServicos/:id', controller.getAgendaServicos);
router.post('/styleme/agendaservicos/saveAgendaServicos', controller.saveAgendaServicos);
router.delete('/styleme/agendaservicos/deleteAgendaServicos', controller.deleteAgendaServicos);

module.exports = router;