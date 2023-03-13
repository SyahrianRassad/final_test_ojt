const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "reimburtment",
  {
    id_reimburtment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
    reimburtment: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    request_status: {
        type: DataTypes.ENUM("pending","allowed","denied"),
        defaultValue: 'pending'
    },
  },
  { tableName: "reimburtment", timestamps: false }
);

module.exports = data;
