'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controller/agenda-controller');

router.get('/styleme/agenda/listAgenda/:id', controller.getAgendaDatas);
router.get('/styleme/agenda/listHorarios/:id/:data', controller.getAgendaHorarios);
router.get('/styleme/agenda/listAgendamentos/:id', controller.getAgendamentos);
router.get('/styleme/agenda/disponivel/:id/:data', controller.getDisponivel);
router.get('/styleme/agenda/ocupados/:id/:data', controller.getOcupado);
router.post('/styleme/agenda/gerarHorarios', controller.gerarHorarios);
router.post('/styleme/agenda/agendaStatus', controller.agendaStatus);
router.post('/styleme/agenda/salvarAgenda', controller.salvarAgenda);
router.post('/styleme/agenda/fecharAgenda', controller.fecharAgenda);
router.post('/styleme/agenda/fecharCaixa', controller.fecharCaixa);
router.get('/styleme/agenda/listCaixa/:id/:data', controller.getCaixa);
router.get('/styleme/agenda/Caixatotal/:id/:data', controller.getTotal);
router.get('/styleme/agenda/deletehorarios/:id/:data', controller.deleteHorarios);
router.get('/styleme/agenda/listAgendar/:id', controller.getAgendarDatas);
router.get('/styleme/agenda/listAgendarHorarios/:id/:data', controller.getAgendarHorarios);


module.exports = router;