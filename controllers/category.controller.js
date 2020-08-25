var Top = require("../models/model.top");

module.exports.topView = async (req, res) => {
  var tops = await Top.find();
  res.render("tops/index", {
    tops: tops,
  });
};

module.exports.saleView = async (req, res) => {
  var sales = await Top.find({sale: true});
  res.render("tops/index", {
    tops: sales,
  });
};

