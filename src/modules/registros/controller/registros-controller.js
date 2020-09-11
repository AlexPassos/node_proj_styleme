'use strict'

const emailService = require('../../../services/email-service');
const model = require('../../../../bin/modelLoader');

exports.getRegistros = (req, res) => {

    const id = req.params.id;

    model.Registros.findAll({
        include: [
            { model: model.Profissional }
        ],
        where: {
            idprofissional: id,
        }
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.postEmailValidacao = async (req, res, next) => {
    try {

        const { nome, codigo, email } = req.body;

        var emailTexto = `<img src="http://www.nsolucoesemti.com.br/styleme/logocolor.png" 
            alt="logo-styleme" height="101" width="200">
            <br/><br/>
            Olá, <strong>${nome}</strong>, 
            seja bem vindo ao Style Me!
            <br><br/>
            Seu código de validação é: <strong>${codigo}</strong>`;

        var emailBody = `<img src="http://www.nsolucoesemti.com.br/styleme/logocolor.png" 
                        alt="logo-styleme" height="101" width="200">
                    <br/><br/>
                    Olá, <strong>${nome}</strong>, 
                    seja bem vindo ao Style Me!
                    <br/><br/>
                    Seu código de validação é: <strong>${codigo}</strong>`;

            let assunto = 'Style Me - Código de validação';
            emailService.enviarEmail(email, assunto,  emailTexto, emailBody);

        res.status(201).send({ message: 'E-mail enviado com sucesso' });

    } catch (e) {
        res.status(400).send({ message: 'Erro ao enviar', data: e });
    }
};

exports.getLoginCadastro = (req, res) => {
    var sequelize = model.sequelize;

    const login = req.params.login;

    model.Acesso.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('login')), 'login']],
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

exports.postRegistrarProfissional = async (req, res, next) => {
    var sequelize = model.sequelize;
    const { nome, salao, email, celular, idestado, idcidade, usuario, senha, codigo, apelido } = req.body;
    const situacao = true;
    const acesso = false;
    const nivel = true;
    const dependente = false;

    var datacad = dataAtualFormatada();

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            let dadosPro = {
                "datacad": datacad,
                "nome": nome,
                "salao": salao,
                "email": email,
                "celular": celular,
                "idestado": idestado,
                "idcidade": idcidade,
                "login": usuario,
                "senha": senha,
                "codigo": codigo,
                "situacao": situacao,
                "acesso": acesso,
                "nivel": nivel,
                "dependente": dependente,
                "apelido": apelido
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
                "senha": senha,
                "email": email
            }

            //Salva na tabela acesso
            let ida;
            await model.Acesso.create(dadosAcesso, { transaction: t }).then(function(ac){
                ida = ac.dataValues.id;
            });

            let dadosTabela = {
                "idprofissional": idp,
                "cabelo": 0,
                "barba": 0,
                "codigo": codigo
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

exports.postRegistrarUsuario = async (req, res, next) => {
    var sequelize = model.sequelize;
    const { nome, email, telefone, nascimento, sexo, idestado, idcidade, usuario, senha, apelido } = req.body;
    const situacao = true;

    var datacad = dataAtualFormatada();

    let transacao;

    try {
        transacao = await sequelize.transaction(async (t) => {

            let dadosUser = {
                "nome": nome,
                "email": email,
                "telefone": telefone,
                "nascimento": nascimento,
                "sexo": sexo,
                "idestado": idestado,
                "idcidade": idcidade,
                "login": usuario,
                "senha": senha,
                "situacao": situacao,
                "datacad": datacad,
                "apelido": apelido
            }

            let idu;
            //salva na tabela profissional
            await model.Usuarios.create(dadosUser, { transaction: t }).then(function (ret) {
                //console.log(ret);
                idu = ret.dataValues.id;
            });

            let dadosAcesso = {
                "idusuarios": idu,
                "login": usuario,
                "senha": senha,
                "email": email
            }

            //Salva na tabela acesso
            await model.Acesso.create(dadosAcesso, { transaction: t });

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

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return anoF + "-" + mesF + "-" + diaF;
}