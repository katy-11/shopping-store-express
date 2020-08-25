var Product = require("../../models/model.product");

module.exports.topIndex = (req, res) => {
  res.render("dist/index");
};

module.exports.topDatabase = async (req, res) => {
  var products = await Product.find();
  res.json(products);
};

module.exports.topCreate = async (req, res) => {
  var product = await Product.create(req.body);
  res.json(product);
};

module.exports.topViewSingle = async (req, res) => {
  try {
    var product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  }  catch (error) {
    res.sendStatus(404);
  }
};

module.exports.topUpdate = async (req, res) => {
  try {
    var product = await Product.update(
      { _id: req.params.id },
      req.body);
    res.json(product);    
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.topDelete = async (req, res) => {
  var product = await Product.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send("remove not successfully");
    }
    if (!product) {
      res.sendStatus(404);
      return;
    }
    res.send("remove successfully");
  });
};
