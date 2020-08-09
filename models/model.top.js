const mongoose = require('mongoose');

var topSchema = new mongoose.Schema({
	name: String,
	desc: String,
	price: String,
	imageUrl: String,
	color: String,
	category: String,
	refinement: String,
	sale: Boolean,
	imageItem: Array,
	date: String

});

var Top = mongoose.model('tops', topSchema);

module.exports = Top;