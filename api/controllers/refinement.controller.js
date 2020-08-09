var Top = require('../../models/model.top');

module.exports.postFilterRefinement = async (req, res) => {
	var range1 = parseInt(req.body.price[0]);
	var range2 = parseInt(req.body.price[1]);

	var tops = await Top.find({
		$and: [
		{price: {$gte: range1, $lte: range2}}, 
		{refinement: req.body.refinement}
		]
	});
	res.json(tops);
}