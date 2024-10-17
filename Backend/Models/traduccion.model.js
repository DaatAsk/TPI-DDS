import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import Idioma from "./idioma.model.js";
import Cont from "./cont.model.js";

const Traduccion = sequelize.define(
  "Traduccion",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdIdioma: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Traduccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

Traduccion.belongsTo(Idioma, { foreignKey: "IdIdioma", onDelete: "CASCADE",
      onUpdate: "CASCADE" });
Traduccion.belongsTo(Cont, { foreignKey: "CodCont", onDelete: "CASCADE",
      onUpdate: "CASCADE", });

export default Traduccion;
