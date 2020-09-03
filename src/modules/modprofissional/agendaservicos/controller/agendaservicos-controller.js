'use strict'
var moment = require('moment');
const model = require('../../../../../bin/modelLoader');

exports.getAgendaServicos = (req, res) => {

    const id = req.params.id;

    model.Agendaservicos.findAll({
        include: [
            { model: model.Profissional },
            { model: model.Agenda },
            { model: model.Tabela }
        ],
        where: {
            idagenda: id,            
        },
        order: ['id'],
    }).then((dados) => {

        res.send(dados);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.saveAgendaServicos = async (req, res, next) => {
    var sequelize = model.sequelize;

    const { idprofissional, idagenda, idtabela, valor } = req.body;
    
    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            let dadosPro = {
                "idprofissional": idprofissional,
                "idagenda": idagenda,
                "idtabela": idtabela,
                "valor": valor,              
            }
            //console.log(dadosPro);
            
            //salva na tabela agendaservicos
            await model.Agendaservicos.create(dadosPro, { transaction: t });

        }).then(r => {
            console.log(r);
        }).catch(err => {
            console.log(err);
        });

        return res.send('Cadastro realizado com sucesso!');
    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha no cadastro');
    }

};

exports.deleteAgendaServicos = async (req, res, next) => {
    var sequelize = model.sequelize;

    const id = req.body.id;    

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            //Deleta na tabela agendaservicos
            await model.Agendaservicos.destroy({ where: { id: id } }, { transaction: t });


        }).then(r => {
            //console.log(r);
        }).catch(err => {
            //console.log(err);
        });

        return res.send('Removido realizado com sucesso!');
    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha no cadastro');
    }

};
