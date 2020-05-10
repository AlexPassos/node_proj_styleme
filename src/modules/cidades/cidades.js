'use strict'

const routerCidades = require('./routes/cidades-routes')

exports.init = (app) => {

    app.use('/', routerCidades);

}