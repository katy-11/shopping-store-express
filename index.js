require('dotenv').config();
//req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL);

var topRoute = require('./routes/top.route');

// var authMiddleware = require('./middleware/auth.middleware');
// var sessionMiddleware = require('./middleware/session.middleware');

// var cartItem = require('./controllers/cart.controller.js');

var port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// var apiProductRouter = require('./api/routes/product.route');

app.use(cookieParser('process.env.SESSION_SECRET'));
// app.use(sessionMiddleware);

app.get('/', (req, res) => {
	res.render('index');
});

app.use(express.static('public'));
app.use(express.static('views/dist'));

app.use('/tops', topRoute);


app.listen(port, function() {
	console.log('Server listening at port 3000');
});

