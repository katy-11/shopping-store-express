var Top = require('../models/model.top');

module.exports.index = async (req, res) => {
	var tops = await Top.find();
	res.render('tops/index', {
		tops: tops
	});
}