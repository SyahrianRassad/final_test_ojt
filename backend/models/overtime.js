const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "overtime",
  {
    id_overtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    over_time: {
    type: DataTypes.TIME,
    allowNull: false,
    },
    request_status: {
        type: DataTypes.ENUM("pending","allowed","denied"),
        defaultValue: 'pending'
    },
  },
  { tableName: "overtime", timestamps: false }
);

module.exports = data;
