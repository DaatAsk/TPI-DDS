import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";

const TipoDoc = sequelize.define(
  "TipoDocumento",
  {
    Id_docTipo: {
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

export default TipoDoc;