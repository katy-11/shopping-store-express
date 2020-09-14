require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
	useCreateIndex: true,	
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

var productRoute = require("./routes/product.route");
var categoryController = require("./controllers/category.controller");
var searchRoute = require("./routes/search.route");
var signRoute = require("./routes/sign.route");
var userRoute = require("./routes/user.route");

var apiRoute = require("./api/routes/api.route");
var adminRoute = require("./api/routes/admin.route");

var authMiddleware = require('./middleware/auth.middleware');
var sendgridMiddleware = require('./middleware/sendgrid.middleware')
var port = process.env.PORT || 3000;
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("process.env.SESSION_SECRET"));
app.use(express.static("public"));
app.use(express.static("views/dist"));

app.get("/", authMiddleware.checkUser, sendgridMiddleware.connectPage);

app.get("/new-arrivals", authMiddleware.checkUser, categoryController.newView);
app.get("/bags", authMiddleware.checkUser, categoryController.bagView);
app.get("/tops", authMiddleware.checkUser, categoryController.topView);
app.get("/bottoms", authMiddleware.checkUser, categoryController.bottomView);
app.get("/sales", authMiddleware.checkUser, categoryController.saleView);
app.get("/about-us", authMiddleware.checkUser, categoryController.contactView);

app.use("/admin", adminRoute);
app.use("/api", apiRoute);
app.use("/product", authMiddleware.checkUser, productRoute);
app.use("/search", authMiddleware.checkUser, searchRoute);
app.use("/sign", authMiddleware.checkUser, signRoute);
app.use("/user", authMiddleware.requireAuth, userRoute)

app.get("/:id", authMiddleware.checkUser, categoryController.errorView);

app.listen(port, () => console.log("Server listening at port 3000"));
