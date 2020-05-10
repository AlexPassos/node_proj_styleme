'use strict'

module.exports = (sequelize, DataTypes) => {

    const Padrao = sequelize.define('Padrao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        descricao: {
            type: DataTypes.STRING,
            field: 'descricao'
        },

    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'padrao',
        timestamps: false,

    })
    // Setores.associate = function (model) {        
    //     Setores.belongsToMany(model.Produto, {
    //         through: 'produto',
    //         foreignKey: 'id_setor'            
    //     });

    // }

    return Padrao

}