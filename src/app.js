"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const indexRoute = require('./routes/index');
const acesso = require('../src/modules/acesso/acesso');
const estados = require('../src/modules/estados/estados');
const cidades = require('../src/modules/cidades/cidades');
const registros = require('../src/modules/registros/registros');
const agenda = require('../src/modules/modprofissional/agenda/agenda');
const cabeleireiros = require('../src/modules/modprofissional/cabeleireiros/cabeleireiros');
const profissional = require('../src/modules/modprofissional/profissional/profissional');
const tabela = require('../src/modules/modprofissional/tabela/tabela');
const historico = require('../src/modules/modusuarios/historico/historico');
const usuarios = require('../src/modules/modusuarios/usuarios/usuarios');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));// apenas dados simples
app.use(bodyParser.json());//só recebe json

//Habilita o cors
app.use(function(req, res, next){
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Carrega as rotas
indexRoute.init(app);
acesso.init(app);
estados.init(app);
cidades.init(app);
registros.init(app);
agenda.init(app);
cabeleireiros.init(app);
profissional.init(app);
tabela.init(app);
historico.init(app);
usuarios.init(app);

//Quanto não encontrar nenhuma rota
app.use((req, res, next) => {
    const err = new Error('Não encontrado');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        } 
    });
});

module.exports = app;