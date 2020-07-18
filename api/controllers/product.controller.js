var Product = require('../../models/model.product');

module.exports.index = async (req, res) => {
	var products = await Product.find();
	res.json(products);
};

module.exports.view = (req, res) => {
  // var product = await Product.find(req.body);
  // res.json(product);
  res.render('dist/index')
};

module.exports.create = async (req, res) => {
  var product = await Product.create(req.body);
  res.json(product);
};