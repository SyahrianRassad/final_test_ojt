const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "announcement",
  {
    id_announcement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "announcement", timestamps: false }
);

module.exports = data;
