import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./Data/AppDB.sqlite",
});

export default sequelize;