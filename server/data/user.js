const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false,
});

module.exports = sequelize.define("User", {
  company_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  company_domain: DataTypes.STRING,
  access_token: DataTypes.STRING,
  refresh_token: DataTypes.STRING,
  settings: DataTypes.STRING,
});
