//req.query
var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

//routers
app.get('/', function(req, res) {
	res.render('index', {
		name: 'Coders Tokyo',
	});
}); 
// app.get('/styles/custom.css', function(req, res) {
// 	res.send('abc');
// }); // example. this is not the popular way
app.use('/users', userRoute);

app.listen(3000, function() {
	console.log('Server listening at port 3000');
});

//Method GET, POST, ..
