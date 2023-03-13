const Sequelize = require("sequelize");
const redis = require("redis");
// require('dotenv').config()

const db = new Sequelize({
  dialect: "mysql",
  username: "root",
  host: "localhost",
  database: "ojt_final_test",
  password: ""
});

const redisClient = redis.createClient({
  legacyMode: true
});

const redisConnection = async () => {
  try {
    await redisClient.on("connect", () => {
      console.log("Redis connection established");
    });
  } catch (error) {
    console.log("Redis", error.message);
  }
};

const DBConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database connection established");
  } catch (error) {
    console.log("Sequelize", error.message);
  }
};

module.exports = { db, DBConnection, redisClient, redisConnection };
