'use strict'

const model = require('../../../../bin/modelLoader');

exports.getCidades = (req, res) => {

    const id = parseInt(req.params.id);

    model.Cidades.findAll({
        include: [
            { model: model.Estados }            
        ],
        where:{
            idestados: id,
        },
        order: ['nome']
    }).then((data) => {

        res.send(data);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
};