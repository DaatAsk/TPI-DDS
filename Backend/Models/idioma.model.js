import sequelize from '../Data/connectionToDB.js'
import { DataTypes } from 'sequelize';

const Idioma = sequelize.define(
  "Idioma",
  {
    IdIdioma: {
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

export default Idioma