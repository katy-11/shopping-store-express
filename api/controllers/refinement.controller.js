var Product = require("../../models/model.product");

module.exports.postFilterRefinement = async (req, res) => {
  var products = await Product.find(req.body);
  res.json(products);
};

module.exports.postSortedRefinement = async (req, res) => {
  var products = await Product.find(req.body).sort({date: -1});
  res.json(products);
};

module.exports.postSearchRefinement = async (req, res) => {
  let matchedList = await Product.find(
    req.body,
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" }});
  res.json(matchedList);
};
