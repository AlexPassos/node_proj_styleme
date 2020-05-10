'use strict'

const routerTabela = require('./routes/tabela-routes')

exports.init = (app) => {

    app.use('/', routerTabela);

}