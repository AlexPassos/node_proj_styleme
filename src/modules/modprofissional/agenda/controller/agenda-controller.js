'use strict'
var moment = require('moment');
const model = require('../../../../../bin/modelLoader');

exports.getAgendaDatas = (req, res) => {

    var sequelize = model.sequelize;

    const id = req.params.id;

    model.Agenda.findAll({
        // include: [
        //     { model: model.Usuarios, attributes: [
        //         [sequelize.fn('max', sequelize.col('Usuario')), 'Usuario'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.nome')), 'nome'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.email')), 'email'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.telefone')), 'telefone'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.nascimento')), 'nascimento'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.sexo')), 'sexo'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.idestado')), 'idestado'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.idcidade')), 'idcidade'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.login')), 'login'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.senha')), 'senha'],
        //         // [sequelize.fn('bool_or', sequelize.col('Usuario.situacao')), 'situacao'],
        //         // [sequelize.fn('max', sequelize.col('Usuario.datacad')), 'datacad'],
        //     ] },
        //     { model: model.Profissional, attributes: [
        //         [sequelize.fn('max', sequelize.col('Profissional')), 'Profissional'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.datacad')), 'datacad'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.nome')), 'nome'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.salao')), 'salao'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.nascimento')), 'nascimento'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.sexo')), 'sexo'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.email')), 'email'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.cpfcnpj')), 'cpfcnpj'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.rgie')), 'rgie'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.telefone')), 'telefone'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.celular')), 'celular'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.cep')), 'cep'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.endereco')), 'endereco'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.numero')), 'numero'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.complemento')), 'complemento'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.bairro')), 'bairro'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.idestado')), 'idestado'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.idcidade')), 'idcidade'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.login')), 'login'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.senha')), 'senha'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.codigo')), 'codigo'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.pj')), 'pj'],
        //         // [sequelize.fn('bool_or', sequelize.col('Profissional.situacao')), 'situacao'],
        //         // [sequelize.fn('bool_or', sequelize.col('Profissional.acesso')), 'acesso'],
        //         // [sequelize.fn('max', sequelize.col('Profissional.pasta')), 'pasta'],

        //     ] },
        // ],
        where: {
            idprofissional: id
        },
        attributes: [
            [sequelize.fn('max', sequelize.col('id')), 'id'],
            [sequelize.fn('max', sequelize.col('idprofissional')), 'idprofissional'],
            [sequelize.fn('bool_or', sequelize.col('cadusuario')), 'cadusuario'],
            [sequelize.fn('max', sequelize.col('idusuario')), 'idusuario'],
            [sequelize.fn('max', sequelize.col('nome')), 'nome'],
            [sequelize.col('data'), 'data'],
            [sequelize.fn('max', sequelize.col('horario')), 'horario'],
            [sequelize.fn('max', sequelize.col('datacons')), 'datacons'],
            [sequelize.fn('max', sequelize.col('status')), 'status'],
            [sequelize.fn('bool_or', sequelize.col('situacao')), 'situacao'],

            // [
            //     sequelize.literal(`(select count(id) from agenda where agenda.idprofissional=${id} 
            //         and agenda.data='2020-04-16' and agenda.situacao=true)`), 'disponivel'
            // ]

        ],
        group: ['data'],
        order: ['data'],
        raw: true
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getAgendaHorarios = (req, res) => {

    const id = req.params.id;
    const data = req.params.data;

    model.Agenda.findAll({
        where: {
            idprofissional: id,
            data: data
        },
        order: ['horario'],
    }).then((dados) => {

        res.send(dados);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getDisponivel = (req, res) => {
    var sequelize = model.sequelize;

    const id = req.params.id;
    const data = req.params.data;

    model.Agenda.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('situacao')), 'disponivel']],
        where: {
            idprofissional: id,
            data: data,
            situacao: true
        },
    }).then((dados) => {

        res.send(dados);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.getOcupado = (req, res) => {
    var sequelize = model.sequelize;

    const id = req.params.id;
    const data = req.params.data;

    model.Agenda.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('situacao')), 'ocupado']],
        where: {
            idprofissional: id,
            data: data,
            situacao: false
        },
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};

exports.agendaStatus = async (req, res) => {
    var sequelize = model.sequelize;

    const { id, status } = req.body;

    let transacao;

    try {
        transacao = await sequelize.transaction(async (tr) => {

            let dados;
            if (status == 0) {
                dados = {
                    "cadusuario": false,
                    "idusuario": null,
                    "nome": '',
                    "status": status,
                    "situacao": true
                }
            } else {
                dados = {
                    "status": status,
                    "situacao": false
                }
            }

            //salva na tabela agenda
            await model.Agenda.update(dados, {
                where: {
                    id: id
                }
            }, { transaction: tr });

        }).then(r => {
            //console.log(r);
        }).catch(err => {
            //console.log(err);
        });

        return res.send('Status atualizado com sucesso!');

    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha ao gerar horários.');
    }

};

exports.gerarHorarios = async (req, res) => {
    var sequelize = model.sequelize;

    const { idprofissional, datainicial, datafinal, horainicial, horafinal,
        intervalo, segunda, terca, quarta, quinta, sexta, sabado, domingo } = req.body;

    const status = 0;
    const situacao = true;

    let transacao;

    try {
        transacao = await sequelize.transaction(async (tr) => {

            var dInicial = moment(datainicial);
            var dFinal = moment(datafinal);
            //console.log(dInicial);

            //LOOP PARA AS DATAS
            for (var dt = moment(dInicial); dt.diff(dFinal, 'days') <= 0; dt.add(1, 'days')) {
                //console.log(dt.format('YYYY-MM-DD'));

                var data = dt.format('YYYY-MM-DD');
                var hInicial = moment(`${data} ${horainicial}:00`);
                var hFinal = moment(`${data} ${horafinal}:00`);
                var dia = dt.weekday();

                if (dia == 0 && domingo == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 1 && segunda == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 2 && terca == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 3 && quarta == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 4 && quinta == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }
                        console.log(datacons);
                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 5 && sexta == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

                if (dia == 6 && sabado == true) {
                    //LOOP PARA OS HORÁRIOS
                    for (var h = moment(hInicial); h <= hFinal; h.add(intervalo, 'minutes')) {
                        //console.log(t.format('HH:mm:ss'));
                        var horario = h.format('HH:mm:ss');
                        var datacons = moment(`${data} ${horario}.999z`).toISOString();

                        let dados = {
                            "idprofissional": idprofissional,
                            "cadusuario": false,
                            "nome": '',
                            "data": data,
                            "horario": horario,
                            "datacons": datacons,
                            "status": status,
                            "situacao": situacao,
                        }

                        //salva na tabela agenda
                        await model.Agenda.create(dados, { transaction: tr });

                    }//FIM LOOP HORÁRIOS
                }

            }//FIM LOOP DATAS

        }).then(r => {
            //console.log(r);
        }).catch(err => {
            //console.log(err);
        });

        return res.send('Horários gerados com sucesso!');

    } catch (e) {
        if (transacao) await transacao.rollback();
        //console.log(e);
        return res.send('Falha ao gerar horários.');
    }

};
