import sequelize from "../Data/connectionToDB.js";
import { DataTypes } from "sequelize";
import TempSerie from "./tempSerie.model.js";
import Cont from "./cont.model.js";

const CapTemp = sequelize.define(
  "CapTemporada",
  {
    CodCont: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    NroTemp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    CodCap: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

CapTemp.belongsTo(TempSerie, { foreignKey: "NroTemp", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
CapTemp.belongsTo(TempSerie, { foreignKey: "CodCont" , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
CapTemp.belongsTo(Cont, { foreignKey: "CodCont" , onDelete: 'CASCADE', onUpdate: 'CASCADE'});

export default CapTemp;
