import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import TipoCont from "./tipoCont.model.js";

const Cont = sequelize.define(
  "Cont",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Contenidos",
    timestamps: false,
  }
);

Cont.belongsTo(TipoCont, {
  foreignKey: "Id_tipo", onDelete: "CASCADE", onUpdate: "CASCADE",
});

export default Cont;