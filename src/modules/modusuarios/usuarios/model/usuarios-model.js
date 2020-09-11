'use strict'

module.exports = (sequelize, DataTypes) => {

    const Usuarios = sequelize.define('Usuarios', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        nome: {
            type: DataTypes.STRING,
            field: 'nome'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },
        telefone: {
            type: DataTypes.STRING,
            field: 'telefone'
        },
        nascimento: {
            type: DataTypes.DATE,
            field: 'nascimento'
        },
        sexo: {
            type: DataTypes.INTEGER,
            field: 'sexo'
        },
        idestado: {
            type: DataTypes.INTEGER,
            field: 'idestado',
            references: {
                model: 'Estados',
                key: 'id'
            }
        },
        idcidade: {
            type: DataTypes.INTEGER,
            field: 'idcidade',
            references: {
                model: 'Cidades',
                key: 'id'
            }
        },
        login: {
            type: DataTypes.STRING,
            field: 'login'
        },
        senha: {
            type: DataTypes.STRING,
            field: 'senha'
        },
        situacao: {
            type: DataTypes.BOOLEAN,
            field: 'situacao'
        },
        datacad: {
            type: DataTypes.DATE,
            field: 'datacad'
        },
        apelido: {
            type: DataTypes.STRING,
            field: 'apelido'
        },
    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'usuarios',
        timestamps: false,

    })
    Usuarios.associate = function (model) {
        Usuarios.belongsTo(model.Estados, {targetKey: 'id', foreignKey: 'idestado' })
        Usuarios.belongsTo(model.Cidades, {targetKey: 'id', foreignKey: 'idcidade' })
        Usuarios.belongsToMany(model.Acesso, {
            through: 'acesso',
            foreignKey: 'idusuarios'
        });
        Usuarios.belongsToMany(model.Agenda, {
            through: 'agenda',
            foreignKey: 'idusuarios'
        });

    }

    return Usuarios

}