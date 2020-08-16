var express = require("express");

var topController = require("../controllers/top.controller");
var userController = require("../controllers/user.controller");
var refinementController = require("../controllers/refinement.controller");

var Route = express.Router("");

// top api
Route.get("/top", topController.topIndex);

Route.get("/top/database", topController.topDatabase);

Route.post("/top", topController.topCreate);

Route.get("/top/:id", topController.topViewSingle);

Route.put("/top/:id", topController.topUpdate);

Route.delete("/top/:id", topController.topDelete);

// user api

Route.get("/user", userController.usersIndex);

Route.get("/user/:id", userController.userSingleDetail);

Route.put("/user/:id", userController.userUpdate);

Route.put("/user/cart/:id", userController.cartUpdate);

Route.delete("/user/:id", userController.userDelete);

module.exports = Route;

// sign (user.controller.js)

Route.post("/sign/in", userController.userSigninCheck);

//refinement

Route.post("/refinement", refinementController.postFilterRefinement);
