var express = require("express");

var controller = require("../controllers/user.controller");
var upload = require("../multer/upload_image");

var Router = express.Router("");

Router.get("/profile", controller.profile);

Router.post("/profile/:id",
	upload.single("avatar"),
	controller.postProfile);

Router.get("/cart", controller.myCart);

Router.get("/order", controller.myOrder);

Router.get("/:id", controller.myError);

module.exports = Router;