'use strict'

const routerAgenda = require('./routes/agenda-routes')

exports.init = (app) => {

    app.use('/', routerAgenda);

}