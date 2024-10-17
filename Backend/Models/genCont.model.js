import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import Cont from "./cont.model.js";
import Genero from "./genero.model.js";

const GenCont = sequelize.define(
  "GenerosCont",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdGenero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { timestamps: false }
);

GenCont.belongsTo(Cont, { foreignKey: "CodCont", onDelete: "CASCADE",
      onUpdate: "CASCADE", });
GenCont.belongsTo(Genero, {
  foreignKey: "IdGenero", onDelete: "CASCADE", onUpdate: "CASCADE",
});

export default GenCont;