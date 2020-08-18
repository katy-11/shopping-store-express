var express = require("express");

var controller = require("../controllers/user.controller");
var upload = require("../multer/upload_image");

var Router = express.Router("");

Router.get("/profile", controller.profile);

Router.post("/profile/:id",
	upload.single("avatar"),
	controller.postProfile);

module.exports = Router;