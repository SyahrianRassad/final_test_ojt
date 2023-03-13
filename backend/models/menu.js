const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "menu",
  {
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    pages: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "menu", timestamps: false }
);

module.exports = data;
