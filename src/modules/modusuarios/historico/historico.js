'use strict'

const routerHistorico = require('./routes/historico-routes')

exports.init = (app) => {

    app.use('/', routerHistorico);

}