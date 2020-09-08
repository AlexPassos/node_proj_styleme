'use strict'

module.exports = (sequelize, DataTypes) => {

    const Tabela = sequelize.define('Tabela', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        idprofissional: {
            type: DataTypes.STRING,
            field: 'idprofissional',
            references: {
                model: 'Profissional',
                key: 'id'
            }
        },
        cabelo: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'cabelo'
        },
        barba: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'barba'
        },
    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'tabela',
        timestamps: false,

    })
    Tabela.associate = function (model) {
        Tabela.belongsTo(model.Profissional, { targetKey: 'id', foreignKey: 'idprofissional' })
        Tabela.belongsToMany(model.Agendaservicos, {
            through: 'agendaservicos',
            foreignKey: 'idtabela'            
        });
        
    }

    return Tabela

}