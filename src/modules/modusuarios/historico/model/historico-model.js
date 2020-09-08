"use strict";

module.exports = (sequelize, DataTypes) => {
  const Historico = sequelize.define(
    "Historico",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      idprofissional: {
        type: DataTypes.INTEGER,
        field: "idprofissional",
        references: {
          model: "Profissional",
          key: "id",
        },
      },
      idusuario: {
        type: DataTypes.INTEGER,
        field: "idusuario",
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      data: {
        type: DataTypes.DATE,
        field: "data",
      },
      horario: {
        type: DataTypes.STRING,
        field: "horario",
      },
      datacons: {
        type: DataTypes.DATE,
        field: "datacons",
      },
      status: {
        type: DataTypes.INTEGER,
        field: "status",
      },
      situacao: {
        type: DataTypes.BOOLEAN,
        field: "situacao",
      },
      cabelo: {
        type: DataTypes.BOOLEAN,
        field: "cabelo",
      },
      barba: {
        type: DataTypes.BOOLEAN,
        field: "barba",
      },
      desconto: {
        type: DataTypes.DECIMAL(10, 2),
        field: "desconto",
      },
      valorcabelo: {
        type: DataTypes.DECIMAL(10, 2),
        field: "valorcabelo",
      },
      valorbarba: {
        type: DataTypes.DECIMAL(10, 2),
        field: "valorbarba",
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        field: "total",
      },
      idagenda: {
        type: DataTypes.INTEGER,
        field: "idagenda",
        references: {
          model: "Agenda",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      schema: "public",
      tableName: "historico",
      timestamps: false,
    }
  );
  Historico.associate = function (model) {
    Historico.belongsTo(model.Usuarios, {
      targetKey: "id",
      foreignKey: "idusuario",
    });
    Historico.belongsTo(model.Profissional, {
      targetKey: "id",
      foreignKey: "idprofissional",
    });
    Historico.belongsTo(model.Agenda, {
      targetKey: "id",
      foreignKey: "idagenda",
    });
  };

  return Historico;
};
