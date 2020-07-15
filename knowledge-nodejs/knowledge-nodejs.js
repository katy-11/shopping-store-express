//1 - GETTING STARTED
	var express = require('express');

	var app = express();

	app.set('view engine', 'pug');

	app.set('views', './views'); //file js name and path, 
	//views will be roots for any engine template

	app.listen(3000, function() {
		console.log('Server listening at port 3000');
	});

//2 TEMPLATE ENGINES
	
	app.get('/path', function(req, res) {
		res.send('String');
	}); 
	//in real, we will not render to get and send data from that "String" to client
	// we will link the path need to be rendered from the engine template 
	//and send to client then

	res.render('params1', params2);
	//params1: is path whom root is from views
	//params2: is object include a couple of properties which is key: value;
		//we can call that key in the template engine by #{key}
		//example: 
			//server-side
				app.get('/', function(req, res) {
					res.render('index', {
						name: 'AAA'	
					});
				}); 
			//pug side 
				h1 Hello #{name}
				//result: Hello AAA


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
 	