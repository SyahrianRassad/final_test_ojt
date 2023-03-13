const model = {};

model.role = require("./role");
model.menu = require("./menu");
model.accesContol = require('./access.control');
model.profile = require("./profile");
model.user = require("./user");
model.attendance = require("./attendance");
model.announcement = require("./announcment");
model.overtime = require("./overtime");
model.reimburtment = require("./reimburment");

module.exports = model;
