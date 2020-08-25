var Product = require("../models/model.product");

module.exports.viewProduct = async (req, res) => {
  let id = req.params.id;
  try {
    var product = await Product.findOne({ _id: id });
    res.render("products/singleItem", {
      product: product,
      firstFour: product.imageItem[0].slice(0, 4),
      lastFour: product.imageItem[0].slice(4),
    });
  } catch (error) {
    res.render('error');
  }
};

