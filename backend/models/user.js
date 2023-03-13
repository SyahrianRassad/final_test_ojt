const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    profile_id: {
    type: DataTypes.INTEGER,
    },
  },
  { tableName: "user", timestamps: false }
);

module.exports = data;
