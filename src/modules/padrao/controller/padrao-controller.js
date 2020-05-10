'use strict'

const model = require('../../../../bin/modelLoader');

exports.getPadrao = (req, res) => {

    model.Padrao.findAll({

    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};