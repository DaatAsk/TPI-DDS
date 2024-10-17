import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import Subs from "./subs.model.js";

const Uss = sequelize.define(
  "Usuario",
  {
    Nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    NroSub: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.BLOB,
    },
    FechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  },
  { timestamps: false }
);

Uss.belongsTo(Subs, { foreignKey: "NroSub", onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Uss