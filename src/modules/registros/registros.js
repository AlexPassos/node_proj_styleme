'use strict'

const routerRegistros = require('./routes/registros-routes')

exports.init = (app) => {

    app.use('/', routerRegistros);

}