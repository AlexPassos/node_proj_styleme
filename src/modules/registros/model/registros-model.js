'use strict'

module.exports = (sequelize, DataTypes) => {

    const Registros = sequelize.define('Registros', {
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
        codigo: {
            type: DataTypes.STRING,
            field: 'codigo'
        },
        data: {
            type: DataTypes.DATE,
            field: 'data'
        },

    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'registros',
        timestamps: false,

    })
    Registros.associate = function (model) {        
        Registros.belongsTo(model.Profissional, {targetKey: 'id', foreignKey: 'idprofissional' })        
     
    }

    return Registros

}