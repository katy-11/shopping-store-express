var express = require("express");

var controller = require("../controllers/search.controller");

var Router = express.Router("");

Router.get("/", controller.search);

module.exports = Router;
