var express = require("express");

var controller = require("../controllers/product.controller");

var Router = express.Router("");

Router.get("/:id", controller.viewProduct);

module.exports = Router;
