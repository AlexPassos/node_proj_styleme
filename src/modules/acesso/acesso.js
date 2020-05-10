'use strict'

const routerAcesso = require('./routes/acesso-routes')

exports.init = (app) => {

    app.use('/', routerAcesso);

}