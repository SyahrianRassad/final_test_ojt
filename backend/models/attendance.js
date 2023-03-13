const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "attendance",
  {
    id_attendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    check_in: {
        type: DataTypes.ENUM("true","false"),
        defaultValue: 'false'
    },
    check_in_time: {
      type: DataTypes.TIME,
      defaultValue: '00-00-00'
    },
    check_out: {
        type: DataTypes.ENUM("true","false"),
        defaultValue: 'false'
    },
    check_out_time: {
    type: DataTypes.TIME,
    defaultValue: '00-00-00'
    },
    date: {
    type: DataTypes.DATE,
    defaultValue: Date.now()
    },
  },
  { tableName: "attendance", timestamps: false }
);

module.exports = data;
