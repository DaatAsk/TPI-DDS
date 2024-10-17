import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import TipoDoc from "./tipoDoc.model.js";

const Subs = sequelize.define(
  "Subscripcion",
  {
    NroSub: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_docTipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NroDni: {
      type: DataTypes.INTEGER,
    },
    FechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    NroTarjeta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Subs.belongsTo(TipoDoc, { foreignKey: "Id_docTipo", onDelete: 'CASCADE', onUpdate: 'CASCADE'});

export default Subs;