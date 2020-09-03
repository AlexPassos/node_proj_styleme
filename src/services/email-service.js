'use strict';

const nodemailer = require("nodemailer");
var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'nsolucoes@nsolucoesemti.com.br',
        subject: subject,
        html: body
    });
}

exports.enviarEmail = async (to, subject, texto, html) => {
    
    let transporter = nodemailer.createTransport({
        host: config.emailSMTP,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: config.emailREM, // generated ethereal user
          pass: config.emailPASS, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Style Me" <nsolucoes@nsolucoesemti.com.br>', // email remetente
        to: to, // emails destinatarios
        subject: subject, // Assunto
        text: texto, // texto body
        html: html, // html body
    });

        //console.log("Message sent: %s", info.messageId);                    
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}