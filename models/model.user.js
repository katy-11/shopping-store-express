const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	phone: String,
	address: String,
	password: String,
	avatar: String,
	cart: Array
});

var User = mongoose.model('User', userSchema, "users");

module.exports = User;