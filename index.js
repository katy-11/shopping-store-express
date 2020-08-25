require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var adminRoute = require("./routes/admin.route");
var productRoute = require("./routes/product.route");
var categoryController = require("./controllers/category.controller");
var searchRoute = require("./routes/search.route");
var signRoute = require("./routes/sign.route");
var userRoute = require("./routes/user.route");

var authMiddleware = require('./middleware/auth.middleware');

var port = process.env.PORT || 3000;
var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiRoute = require("./api/routes/api.route");

app.use(cookieParser("process.env.SESSION_SECRET"));

app.get("/", authMiddleware.checkUser, (req, res) => {
  res.render("index");
});
app.get("/tops", authMiddleware.checkUser, categoryController.topView);
app.get("/sales", authMiddleware.checkUser, categoryController.saleView);

app.use(express.static("public"));
app.use(express.static("views/dist"));

app.use("/admin", adminRoute);
app.use("/api", apiRoute);
app.use("/product", authMiddleware.checkUser, productRoute);
app.use("/search", authMiddleware.checkUser, searchRoute);
app.use("/sign", authMiddleware.checkUser, signRoute);
app.use("/user", authMiddleware.requireAuth, userRoute)

app.listen(port, function () {
  console.log("Server listening at port 3000");
});
