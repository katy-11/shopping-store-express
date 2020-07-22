const mongoose = require('mongoose');

var topSchema = new mongoose.Schema({
	name: String,
	desc: String,
	price: String,
	imageUrl: String
});

var Top = mongoose.model('tops', topSchema);

module.exports = Top;