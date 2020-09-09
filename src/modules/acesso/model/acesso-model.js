'use strict'

module.exports = (sequelize, DataTypes) => {

    const Acesso = sequelize.define('Acesso', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        idusuarios: {
            type: DataTypes.INTEGER,
            field: 'idusuarios',
            references: {
                model: 'Usuarios',
                key: 'id'
            }
        },
        idprofissional: {
            type: DataTypes.INTEGER,
            field: 'idprofissional',
            references: {
                model: 'Profissional',
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
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },

    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'acesso',
        timestamps: false,

    })
    Acesso.associate = function (model) {
        Acesso.belongsTo(model.Usuarios, { targetKey: 'id', foreignKey: 'idusuarios' })
        Acesso.belongsTo(model.Profissional, { targetKey: 'id', foreignKey: 'idprofissional' })

    }

    return Acesso

}