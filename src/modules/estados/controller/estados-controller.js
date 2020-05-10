'use strict'

const model = require('../../../../bin/modelLoader');

exports.getEstados = (req, res) => {

    model.Estados.findAll({
        order: ['nome']
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};