var User = require('../models/model.user');
var Top = require('../models/model.top');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signup = (req, res) => {
	res.render('sign/signup')
}

module.exports.signin = (req, res) => {
	res.render('sign/signin')
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
			email: req.body.signinEmail 
		}
	).exec((err, user) => {
		console.log(user, "first step");
		if (!user) {
			res.render("sign/signin", {
				errors: "Either email or password is wrong"
			});
			return;
		} else {
			bcrypt.compare(req.body.signinPassword, user.password, function(err, result) {
			    // result = false
			    if (result === false) {
			    	console.log(user, 2)
					res.redirect("sign/signin", {
						errors: "Either email or password is wrong"
					});
			    } else {
					console.log(user, 3);
					// update localStorage to db
					// User.update({
					// 	_id: user._id 
					// }, { $set: {address: "2 thyra" }}).exec();

					res.cookie("user_id", user._id, {
				        signed: true
				      });
					res.redirect("/");
			    }
			});
		}
	});

}