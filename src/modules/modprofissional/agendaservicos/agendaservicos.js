'use strict'

const routerAgendaServicos = require('./routes/agendaservicos-routes')

exports.init = (app) => {

    app.use('/', routerAgendaServicos);

}