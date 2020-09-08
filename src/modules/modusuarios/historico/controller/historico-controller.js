'use strict'
var moment = require('moment');
const model = require('../../../../../bin/modelLoader');

exports.getHistorico = (req, res) => {

    const id = req.params.id;    

    model.Historico.findAll({
        include: [
            { model: model.Profissional },         
            { model: model.Usuarios },    
            { model: model.Agenda, include: [{ model: model.Profissional }]  },              
        ],
        where: {
            idusuario: id,            
        },
        order: [['data', 'DESC']],
    }).then((dados) => {

        res.send(dados);        

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getVerificarHistorico = (req, res) => {

    const id = req.params.id;    

    model.Historico.findAll({
        include: [
            { model: model.Profissional },         
            { model: model.Usuarios },                     
        ],
        where: {
            idagenda: id,            
        },
        order: [['data', 'DESC']],
    }).then((dados) => {

        res.send(dados);        

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};
