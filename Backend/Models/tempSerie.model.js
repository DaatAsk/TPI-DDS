import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import Cont from "./cont.model.js";

const TempSerie = sequelize.define(
  "TempSerie",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    NroTemp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    FechaLanz: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: false }
);

TempSerie.belongsTo(Cont, {
  foreignKey: "CodCont", onDelete: "CASCADE", onUpdate: "CASCADE",
});

export default TempSerie;