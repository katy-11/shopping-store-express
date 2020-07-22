var Top = require('../../models/model.top');

module.exports.index = (req, res) => {
  res.render('dist/index');
};

module.exports.database = async (req, res) => {
	var tops = await Top.find();
	res.json(tops);
};

module.exports.topCreate = async (req, res) => {
  var top = await Top.create(req.body);
  res.json(top);
};

module.exports.topViewSingle = async (req, res) => {
	var top = await Top.find({_id: req.params.id});
	res.json(top);
}

module.exports.topUpdate = async (req, res) => {
	var top = await Top.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
	res.json(top);
	});
};

module.exports.topDelete = async (req, res) => {
	var top = await Top.findByIdAndRemove(req.params.id, (err, result) => {
		if (err) {
			res.send('remove not successfully');
		}
		res.send('remove successfully');
		});
};