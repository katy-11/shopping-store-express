var Product = require('../models/model.product');

module.exports.index = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 8;
  // var drop = (page - 1) * perPage;
  // res.render('products/view', {
  //   page: page,
  //   products: db.get('products').drop(drop).take(perPage).value()
  // })

  	var products = await Product.find();
	res.render('products/view', {
		products: products
	});
};