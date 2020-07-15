require('dotenv').config();
//req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var cookieRouter = require('./routes/cookie.route');
var authRouter = require('./routes/auth.route');
var bookRouter = require('./routes/book.route');
var userRouter = require('./routes/user.route');
var productRouter = require('./routes/product.route');
var profileRouter = require('./routes/profile.route');
var transactionRouter = require('./routes/transaction.route');
var cartRouter = require('./routes/cart.route');



var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

var cartItem = require('./controllers/cart.controller.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.use('/', cookieRouter);
app.use('/auth', authRouter);
app.use('/books', cartItem.addToCart, bookRouter);
app.use('/transactions', authMiddleware.requireAuth, transactionRouter);
app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/products', productRouter);
app.use('/profile', authMiddleware.requireAuth, profileRouter);
app.use('/cart', cartRouter);

//routers
// app.get('/', function(req, res) {
// 	res.render('index', {
// 		name: 'Coders Tokyo',
// 	});
// }); 


app.listen(3000, function() {
	console.log('Server listening at port 3000');
});

