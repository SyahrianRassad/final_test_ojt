const express = require("express");
const app = express();

const roleRoutes = require('./role');
const userRoutes = require('./user');
const announcementRoutes = require('./announcement')
const attendanceRoutes = require('./attendance')
const overtimeRoutes = require('./overtime');
const reimburtmentRoutes = require('./reimburtment')

/**
 * Route for role
 */
app.use("/role", roleRoutes);

/**
 * Route for user
 */
app.use("/user", userRoutes);

/**
 * Route for announcement
 */
app.use("/announcement", announcementRoutes);


/**
 * Route for announcement
 */
app.use("/attendance", attendanceRoutes);


/**
 * Route for announcement
 */
app.use("/overtime", overtimeRoutes);


/**
 * Route for announcement
 */
app.use("/reimburtment", reimburtmentRoutes);

module.exports = app;


