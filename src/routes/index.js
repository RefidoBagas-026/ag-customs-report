var generalRoutes = require("./general");
var publicRoutes = require("./public");
// var authRoutes = require("./auth");
var customsReportRoutes = require("./customs-report");

export default [].concat(publicRoutes, generalRoutes, customsReportRoutes);


