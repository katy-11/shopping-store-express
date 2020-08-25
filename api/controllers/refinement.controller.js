var Product = require("../../models/model.product");

module.exports.postFilterRefinement = async (req, res) => {
  var products = await Product.find(req.body);
  res.json(products);
};
