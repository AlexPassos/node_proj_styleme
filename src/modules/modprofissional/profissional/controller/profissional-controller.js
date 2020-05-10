'use strict'

const model = require('../../../../../bin/modelLoader');

exports.getProfissional = (req, res) => {

    model.Profissional.findAll({
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

exports.getEmailCadastro = (req, res) => {
    var sequelize = model.sequelize;

    const email = req.params.email;

    model.Profissional.findAll({
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

exports.updateProfissional = (req, res) => {

    const dados = req.body;

    let dadosAcesso = {
        "idprofissional": req.body.id,
        "login": req.body.login,
        "senha": req.body.senha
    }

    //Salva na tabela acesso
    model.Acesso.update(dadosAcesso, {
        where: {
            idprofissional: req.body.id
        }
    });

    model.Profissional
        .update(dados, {
            where: {
                id: req.body.id
            }
        })
        .then((data) => {
            res.send(true);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
};

exports.atualizaProfissional = (req, res) => {

    // const {id, nascimento, sexo, cpfcnpj, rgie, telefone, cep, endcereco, numero,
    //         complemento, bairro, pj, acesso, pasta} = req.body;
    const dados = req.body;

    model.Profissional
        .update(dados, {
            where: {
                id: req.body.id
            }
        })
        .then((data) => {
            res.send(true);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
};
