'use strict'

const routerUsuarios = require('./routes/usuarios-routes')

exports.init = (app) => {

    app.use('/', routerUsuarios);

}