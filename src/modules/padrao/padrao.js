'use strict'

const routerPadrao = require('./routes/padrao-routes')

exports.init = (app) => {

    app.use('/', routerPadrao);

}