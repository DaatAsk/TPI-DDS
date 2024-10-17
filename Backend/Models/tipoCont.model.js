import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";

const TipoCont = sequelize.define(
  "TipoCont",
  {
    Id_tipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "TipoCont",
    timestamps: false,
  }
);

export default TipoCont;
