'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/agenda-controller');

router.get('/styleme/agenda/listAgenda/:id', controller.getAgendaDatas);
router.get('/styleme/agenda/listHorarios/:id/:data', controller.getAgendaHorarios);
router.get('/styleme/agenda/disponivel/:id/:data', controller.getDisponivel);
router.get('/styleme/agenda/ocupados/:id/:data', controller.getOcupado);
router.post('/styleme/agenda/gerarHorarios', controller.gerarHorarios);
router.post('/styleme/agenda/agendaStatus', controller.agendaStatus);


module.exports = router;