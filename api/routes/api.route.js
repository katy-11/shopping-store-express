var express = require("express");

var productController = require("../controllers/product.controller");
var userController = require("../controllers/user.controller");
var refinementController = require("../controllers/refinement.controller");

var Route = express.Router("");

//API swagger UI
Route.get("/swagger", productController.productIndex);

// product api
Route.get("/product/database", productController.productDatabase);

Route.post("/product", productController.productCreate);

Route.get("/product/:id", productController.productViewSingle);

Route.put("/product/:id", productController.productUpdate);

Route.delete("/product/:id", productController.productDelete);

// user api

Route.get("/user/database", userController.usersIndex);

Route.get("/user/:id", userController.userSingleDetail);

Route.put("/user/:id", userController.userUpdate);

Route.put("/user/cart/:id", userController.cartUpdate);

Route.delete("/user/:id", userController.userDelete);

// sign (user.controller.js)

Route.post("/sign/in", userController.userSigninCheck);

//refinement

Route.post("/refinement", refinementController.postFilterRefinement);
Route.post("/refinement/sort", refinementController.postSortedRefinement);

module.exports = Route;
