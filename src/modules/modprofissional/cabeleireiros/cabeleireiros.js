'use strict'

const routerCabeleireiros = require('./routes/cabeleireiros-routes')

exports.init = (app) => {

    app.use('/', routerCabeleireiros);

}