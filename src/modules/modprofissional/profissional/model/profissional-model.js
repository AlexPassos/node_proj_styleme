'use strict'

module.exports = (sequelize, DataTypes) => {

    const Profissional = sequelize.define('Profissional', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        datacad: {
            type: DataTypes.DATE,
            field: 'datacad'
        },
        nome: {
            type: DataTypes.STRING,
            field: 'nome'
        },
        salao: {
            type: DataTypes.STRING,
            field: 'salao'
        },
        nascimento: {
            type: DataTypes.DATE,
            field: 'nascimento'
        },
        sexo: {
            type: DataTypes.INTEGER,
            field: 'sexo'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },
        cpfcnpj: {
            type: DataTypes.STRING,
            field: 'cpfcnpj'
        },
        rgie: {
            type: DataTypes.STRING,
            field: 'rgie'
        },
        telefone: {
            type: DataTypes.STRING,
            field: 'telefone'
        },
        celular: {
            type: DataTypes.STRING,
            field: 'celular'
        },
        cep: {
            type: DataTypes.STRING,
            field: 'cep'
        },
        endereco: {
            type: DataTypes.STRING,
            field: 'endereco'
        },
        numero: {
            type: DataTypes.STRING,
            field: 'numero'
        },
        complemento: {
            type: DataTypes.STRING,
            field: 'complemento'
        },
        bairro: {
            type: DataTypes.STRING,
            field: 'bairro'
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
        codigo: {
            type: DataTypes.STRING,
            field: 'codigo'
        },
        pj: {
            type: DataTypes.INTEGER,
            field: 'pj'
        },
        situacao: {
            type: DataTypes.BOOLEAN,
            field: 'situacao'
        },
        acesso: {
            type: DataTypes.BOOLEAN,
            field: 'acesso'
        },
        pasta: {
            type: DataTypes.STRING,
            field: 'pasta'
        },
        nivel: {
            type: DataTypes.BOOLEAN,
            field: 'nivel'
        },
        dependente: {
            type: DataTypes.BOOLEAN,
            field: 'dependente'
        },
        registro: {
            type: DataTypes.BOOLEAN,
            field: 'registro'
        },
        pagamento: {
            type: DataTypes.BOOLEAN,
            field: 'pagamento'
        },
        apelido: {
            type: DataTypes.STRING,
            field: 'apelido'
        },
    }, {
        freezeTableName: true,
        schema: 'public',
        tableName: 'profissional',
        timestamps: false,

    })
    Profissional.associate = function (model) {        
        Profissional.belongsTo(model.Estados, {targetKey: 'id', foreignKey: 'idestado' })
        Profissional.belongsTo(model.Cidades, {targetKey: 'id', foreignKey: 'idcidade' })
       
        Profissional.belongsToMany(model.Acesso, {
            through: 'acesso',
            foreignKey: 'idprofissional'            
        });
        Profissional.belongsToMany(model.Tabela, {
            through: 'tabela',
            foreignKey: 'idprofissional'            
        });
        Profissional.belongsToMany(model.Agenda, {
            through: 'agenda',
            foreignKey: 'idprofissional'            
        });
       
    }

    return Profissional

}