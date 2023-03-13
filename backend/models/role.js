const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "role",
  {
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "role", timestamps: false }
);

module.exports = data;
