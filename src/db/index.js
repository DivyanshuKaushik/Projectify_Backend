import { QueryTypes, Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    console.log("database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function flushDB() {
  try {
    await sequelize.sync({ force: true });
    console.log("database flushed");
  } catch (error) {
    console.error("Unable to flush the database:", error);
  }
}

export default sequelize;
export { connectDB, flushDB };
