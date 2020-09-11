'use strict'

const emailService = require('../../../services/email-service');
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

exports.getAutenticacaoEmail = (req, res) => {

    const email = req.params.email;

    model.Acesso.findAll({
        include: [
            { model: model.Usuarios, include: [{ model: model.Estados }, { model: model.Cidades }] },
            { model: model.Profissional, include: [{ model: model.Estados }, { model: model.Cidades }] },
        ],
        where: {
            email: email,            
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

exports.emailRecuperacao = (req, res) => {

    try {

        const { nome, login, senha, email } = req.body;

        var emailTexto = `<img src="http://www.nsolucoesemti.com.br/styleme/logocolor.png" 
            alt="logo-styleme" height="101" width="200">
            <br/><br/>
            Olá, <strong>${nome}</strong>, 
            você solicitou a recuperação da sua senha!
            <br><br/>
            Seu login é: <strong>${login}</strong><br/>
            Sua senha é: <strong>${senha}</strong>
            <br><br/>
            Obrigado!
            `;

        var emailBody = `<img src="http://www.nsolucoesemti.com.br/styleme/logocolor.png" 
                        alt="logo-styleme" height="101" width="200">
                    <br/><br/>
                    Olá, <strong>${nome}</strong>, 
                    você solicitou a recuperação da sua senha!
                    <br/><br/>
                    Seu login é: <strong>${login}</strong><br/>
                    Sua senha é: <strong>${senha}</strong>
                    <br><br/>
                    Obrigado!
                    `;

            let assunto = 'Style Me - Recuperação de senha';
            emailService.enviarEmail(email, assunto,  emailTexto, emailBody);

        res.status(201).send({ message: 'E-mail enviado com sucesso' });

    } catch (e) {
        res.status(400).send({ message: 'Erro ao enviar', data: e });
    }
};