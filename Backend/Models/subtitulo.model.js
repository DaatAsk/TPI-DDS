import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import Idioma from "./idioma.model.js";
import Cont from "./cont.model.js";

export const Subtitulo = sequelize.define(
  "Subtitulo",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdIdioma: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Subtitulo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  { timestamps: false }
);

Subtitulo.belongsTo(Idioma, { foreignKey: "IdIdioma", onDelete: "CASCADE",
      onUpdate: "CASCADE", });
Subtitulo.belongsTo(Cont, { foreignKey: "CodCont", onDelete: "CASCADE",
      onUpdate: "CASCADE", });

export default Subtitulo;