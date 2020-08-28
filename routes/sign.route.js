var express = require("express");

var controller = require("../controllers/sign.controller");
var validate = require("../validate/user.validate");

var Router = express.Router("");

Router.get("/up", controller.signup);

Router.post("/up", controller.postSignup);

Router.get("/in", controller.signin);

Router.post("/in", validate.postSignin, controller.postSignin);

Router.get("/out", controller.signout);

Router.get("/:id", controller.errorSign);

module.exports = Router;
