import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";

const Genero = sequelize.define(
  "Genero",
  {
    IdGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Genero;