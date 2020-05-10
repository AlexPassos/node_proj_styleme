'use strict'

const env = process.env.NODE_ENV || "development";
const config = require('../config/config.json')[env];
const path = require("path");
let Sequelize = require("sequelize");

//Criando a conexão com o banco de dados de acordo com a configuração do config.json
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

//Criando um array do caminho dos modelos
const models = [
    '../src/modules/acesso/model/acesso-model',
    '../src/modules/estados/model/estados-model',
    '../src/modules/cidades/model/cidades-model',
    '../src/modules/registros/model/registros-model',
    '../src/modules/modprofissional/agenda/model/agenda-model',
    '../src/modules/modprofissional/cabeleireiros/model/cabeleireiros-model',
    '../src/modules/modprofissional/profissional/model/profissional-model',
    '../src/modules/modprofissional/tabela/model/tabela-model',
    '../src/modules/modusuarios/usuarios/model/usuarios-model',    
];

let l = models.length;

//Irá importar os modelos para o sequelize
for (let i = 0; i < l; i++) {
    let model = sequelize.import(path.join(models[i]));
    db[model.name] = model;
}

//Irá percorrer e separar apenas o objeto que contém a propriedade associate, 
//sem o "associate" o sequelize não monta uma relação!
Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName])
        db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;