'use strict'

module.exports = (sequelize, DataTypes) => {

    const Estados = sequelize.define('Estados', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        sigla: {
            type: DataTypes.STRING,
            field: 'sigla'
        },
        nome: {
            type: DataTypes.STRING,
            field: 'nome'
        },
        status: {
            type: DataTypes.BOOLEAN,
            field: 'status'
        }

    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'estados',
        timestamps: false,

    })
    Estados.associate = function (model) {        
        Estados.belongsToMany(model.Profissional, {
            through: 'profissional',
            foreignKey: 'idestado'            
        });
        Estados.belongsToMany(model.Usuarios, {
            through: 'usuarios',
            foreignKey: 'idestado'            
        });
        Estados.belongsToMany(model.Cidades, {
            through: 'cidades',
            foreignKey: 'idestados'            
        });
    }

    return Estados

}