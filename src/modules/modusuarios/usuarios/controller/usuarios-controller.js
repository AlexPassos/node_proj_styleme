'use strict'

const model = require('../../../../../bin/modelLoader');

exports.getUsuarios = (req, res) => {

    model.Usuarios.findAll({
        include: [
            { model: model.Estados },
            { model: model.Cidades }
        ]
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getUsuario = (req, res) => {

    const id = req.params.id;

    model.Usuarios.findAll({
        include: [
            { model: model.Estados },
            { model: model.Cidades }
        ],
        where: {
            id: id
        }
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getEmailCadastro = (req, res) => {
    var sequelize = model.sequelize;

    const email = req.params.email;

    model.Usuarios.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('email')), 'email']],
        where: {
            email: email
        }
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.salvaUsuarios = (req, res) => {

    const dados = req.body;

    model.Usuarios
        .build(dados)
        .save()
        .then((data) => {
            res.send(true);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
};