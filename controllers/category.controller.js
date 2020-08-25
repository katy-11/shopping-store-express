var Product = require("../models/model.product");

module.exports.topView = async (req, res) => {
  var products = await Product.find();
  res.render("products/index", {
    products: products,
  });
};

module.exports.saleView = async (req, res) => {
  var sales = await Product.find({sale: true});
  res.render("products/index", {
    products: sales,
  });
};

