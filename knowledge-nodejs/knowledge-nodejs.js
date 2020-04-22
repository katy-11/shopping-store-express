//1 - GETTING STARTED
	var express = require('express');

	var app = express();

	app.set('view engine', 'pug');

	app.set('views', './views'); //file js name and path

//2 TEMPLATE ENGINES
	app.get('/', function(req, res) {
		res.render('index', {
			name: 'AAA'	
		});
	}); 

	app.get('/users', function(req, res) {
	res.send('User list>');
	}); //in real project,we will render to get users list data and send data to client, 
	// not link the user list data to the client

	app.listen(3000, function() {
		console.log('Server listening at port 3000');
	});

	//Method GET, POST, ..

	//use pug file 
	app.get('/users/search', function(req, res) {
	var q = req.query.q;
	var matchedUsers = users.filter(function(user) {
		// return user.name.indexOf(q) !== -1;
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
	});

//dynamic routing and params

app.get('/users/:id', function(req, res) {
	var id = req.params.id;

	var user = db.get('users').find({id: id}).value();

	res.render('users/view', {
		user: user
	});
});
	
//Express route
module.exports = router;
 	//make sure to declare wvwry route while spliting filr

 	//Controller(MVC)
 	