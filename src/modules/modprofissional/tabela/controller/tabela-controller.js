'use strict'

const model = require('../../../../../bin/modelLoader');

exports.getTabela = (req, res) => {

    const idprofissional = parseInt(req.params.id);

    model.Tabela.findAll({
        include: [
            model.Profissional
        ],
        where:{
            idprofissional: idprofissional,
        },
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.updateTabela = (req, res) => {

    // const {id, nascimento, sexo, cpfcnpj, rgie, telefone, cep, endcereco, numero,
    //         complemento, bairro, pj, acesso, pasta} = req.body;
    const dados = req.body;
    console.log(req.body);

    model.Tabela
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
