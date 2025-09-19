const { Sequelize } = require("sequelize");
require("dotenv").config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_DEV_NAME,
  process.env.DB_DEV_USERNAME,
  process.env.DB_DEV_PASSWORD,
  {
    host: process.env.DB_DEV_HOST,
    dialect: process.env.DB_DEV_DIALECT,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
