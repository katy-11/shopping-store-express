var User = require('../models/model.user');
var Top = require('../models/model.top');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signup = (req, res) => {
	res.render('sign/signup')
}

module.exports.postSignup = async (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
	    // Store hash in your password DB.
	    req.body.password = hash;
	var user = User.create(req.body);
	});
	res.redirect('/');
}

module.exports.postSignin = (req, res) => {
	User.findOne({
			email: req.body.email 
		}
	).exec((err, user) => {
		console.log(user, "first step");
		if (!user) {
			console.log(user, 1)
			res.redirect("/sign/up");
			return;
		} else {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
			    // result = false
			    if (result === false) {
			    	console.log(user, 2)
					res.redirect("/sign/up");
			    } else {
					console.log(user, 3)
					// res.locals.user = user;
					res.redirect("/");
			    }
			});
		}
	});

}