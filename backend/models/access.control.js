const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "access_control",
  {
    id_control: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    control: {
        type: DataTypes.ENUM("allowed","denied"),
        defaultValue: 'denied',
        allowNull: false,
      },
  },
  { tableName: "access_control", timestamps: false }
);

module.exports = data;
