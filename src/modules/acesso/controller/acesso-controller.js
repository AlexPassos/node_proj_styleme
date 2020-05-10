'use strict'

const model = require('../../../../bin/modelLoader');

exports.postAutenticacao = (req, res) => {

    const { login, senha } = req.body;

    model.Acesso.findAll({
        include: [
            { model: model.Usuarios, include: [{ model: model.Estados }, { model: model.Cidades }] },
            { model: model.Profissional, include: [{ model: model.Estados }, { model: model.Cidades }] },
        ],
        where: {
            login: login,
            senha: senha
        }
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.updateLogin = (req, res) => {

    const login = req.params.login;

    model.Acesso.findAll({
        include: [
            { model: model.Usuarios },
            { model: model.Profissional, include: [{ model: model.Estados }, { model: model.Cidades }] },
        ],
        where: {
            login: login
        }
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};