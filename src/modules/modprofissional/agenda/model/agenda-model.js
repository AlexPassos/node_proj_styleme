'use strict'

module.exports = (sequelize, DataTypes) => {

    const Agenda = sequelize.define('Agenda', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        idprofissional: {
            type: DataTypes.INTEGER,
            field: 'idprofissional',
            references: {
                model: 'Profissional',
                key: 'id'
            }
        },
        cadusuario: {
            type: DataTypes.BOOLEAN,
            field: 'cadusuario'
        },
        idusuario: {
            type: DataTypes.INTEGER,
            field: 'idusuario',
            references: {
                model: 'Usuarios',
                key: 'id'
            }
        },
        nome: {
            type: DataTypes.STRING,
            field: 'nome'
        },
        data: {
            type: DataTypes.DATE,
            field: 'data'
        },
        horario: {
            type: DataTypes.STRING,
            field: 'horario'
        },
        datacons: {
            type: DataTypes.DATE,
            field: 'datacons'
        },
        status: {
            type: DataTypes.INTEGER,
            field: 'status'
        },
        situacao: {
            type: DataTypes.BOOLEAN,
            field: 'situacao'
        },
    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'agenda',
        timestamps: false,

    })
    Agenda.associate = function (model) {        
        Agenda.belongsTo(model.Usuarios, { targetKey: 'id', foreignKey: 'idusuario' })
        Agenda.belongsTo(model.Profissional, { targetKey: 'id', foreignKey: 'idprofissional' })
    }

    return Agenda

}