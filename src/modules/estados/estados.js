'use strict'

const modelLoader = require('../../../bin/modelLoader')

const routerEstados = require('./routes/estados-routes')

const models = [    
    '../estados/model/estados-model'
]

exports.init = (app) => {

    app.use('/', routerEstados);

}