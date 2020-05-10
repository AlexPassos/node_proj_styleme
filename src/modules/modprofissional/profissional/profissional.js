'use strict'

const routerProfissional = require('./routes/profissional-routes')

exports.init = (app) => {

    app.use('/', routerProfissional);

}