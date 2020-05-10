'use strict'

const model = require('../../../../../bin/modelLoader');

exports.getCabeleireiros = (req, res) => {

    const codigo = req.params.codigo;

    model.Profissional.findAll({
        include: [
            { model: model.Estados },
            { model: model.Cidades }
        ],
        where: {
            codigo: codigo,
        },
        order: ['id']
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.saveCabeleireiros = async (req, res, next) => {
    var sequelize = model.sequelize;

    const { nome, salao, email, idestado, idcidade, usuario, senha, situacao, nivel, codigo, cabelo, barba } = req.body;
    const acesso = false;
    const pendente = true;
    const pj = 1;

    var datacad = dataAtualFormatada();

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            let dadosPro = {
                "datacad": datacad,
                "nome": nome,
                "salao": salao,
                "email": email,
                "idestado": idestado,
                "idcidade": idcidade,
                "login": usuario,
                "senha": senha,
                "codigo": codigo,
                "pj": pj,
                "situacao": situacao,
                "acesso": acesso,
                "nivel": nivel,
                "pendente": pendente,
            }

            let idp;
            //salva na tabela profissional
            await model.Profissional.create(dadosPro, { transaction: t }).then(function (ret) {
                //console.log(ret);
                idp = ret.dataValues.id;
            });

            let dadosAcesso = {
                "idprofissional": idp,
                "login": usuario,
                "senha": senha
            }

            //Salva na tabela acesso
            await model.Acesso.create(dadosAcesso, { transaction: t });

            let dadosTabela = {
                "idprofissional": idp,
                "cabelo": cabelo,
                "barba": barba
            }
            //Salva na tabela tabela de preços
            await model.Tabela.create(dadosTabela, { transaction: t });

        }).then(r => {
            //console.log(r);
        }).catch(err => {
            //console.log(err);
        });

        return res.send('Cadastro realizado com sucesso!');
    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha no cadastro');
    }

};

exports.updateCabeleireiros = async (req, res, next) => {
    var sequelize = model.sequelize;

    const { id, nome, email, usuario, senha, situacao, nivel } = req.body;

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            let dadosPro = {
                "nome": nome,
                "email": email,
                "login": usuario,
                "senha": senha,
                "situacao": situacao,
                "nivel": nivel,
            }

            //Update na tabela profissional
            await model.Profissional.update(dadosPro, {
                where: {
                    id: id
                }
            }, { transaction: t });

            let dadosAcesso = {
                "login": usuario,
                "senha": senha
            }

            //Update na tabela acesso
            await model.Acesso.update(dadosAcesso, {
                where: {
                    idprofissional: id
                }
            }, { transaction: t });

        }).then(r => {
            //console.log(r);
        }).catch(err => {
            //console.log(err);
        });

        return res.send('Cadastro realizado com sucesso!');
    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha no cadastro');
    }

};

exports.deleteCabeleireiros = async (req, res, next) => {
    var sequelize = model.sequelize;

    const id = req.body.id;
    console.log(id);

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            //Deleta na tabela acesso
            await model.Acesso.destroy({ where: { idprofissional: id } }, { transaction: t });

            //Deleta na tabela tabela de preços
            await model.Tabela.destroy({ where: { idprofissional: id } }, { transaction: t });

            //Deleta na tabela profissional
            await model.Profissional.destroy({ where: { id: id } }, { transaction: t });


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

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return anoF + "-" + mesF + "-" + diaF;
}


