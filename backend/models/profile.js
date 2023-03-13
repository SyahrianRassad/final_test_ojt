const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const data = db.define(
  "profile",
  {
    id_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM("man","woman"),
        allowNull: false,
    },
    age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
  },
  { tableName: "profile", timestamps: false }
);

module.exports = data;
