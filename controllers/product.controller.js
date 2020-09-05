var Product = require("../models/model.product");

module.exports.viewProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findOne({ _id: id });
    let otherProducts = await Product.find({name: product.name}).where('color').ne(product.color);
    res.render("products/singleItem", {
      product: product,
      firstFour: product.imageItem[0].slice(0, 4),
      lastFour: product.imageItem[0].slice(4),
      otherProducts: otherProducts,
    });
  } catch (error) {
    res.render('error');
  }
};

