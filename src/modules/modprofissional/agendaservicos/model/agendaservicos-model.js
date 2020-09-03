'use strict'

module.exports = (sequelize, DataTypes) => {

    const AgendaServicos = sequelize.define('Agendaservicos', {
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
        idagenda: {
            type: DataTypes.INTEGER,
            field: 'idagenda',
            references: {
                model: 'Agenda',
                key: 'id'
            }
        },
        idtabela: {
            type: DataTypes.INTEGER,
            field: 'idtabela',
            references: {
                model: 'Tabela',
                key: 'id'
            }
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'valor'
        },
    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'agendaservicos',
        timestamps: false,

    })
    AgendaServicos.associate = function (model) {        
        AgendaServicos.belongsTo(model.Agenda, { targetKey: 'id', foreignKey: 'idagenda' })
        AgendaServicos.belongsTo(model.Tabela, { targetKey: 'id', foreignKey: 'idtabela' })
        AgendaServicos.belongsTo(model.Profissional, { targetKey: 'id', foreignKey: 'idprofissional' })
        
    }

    return AgendaServicos

}