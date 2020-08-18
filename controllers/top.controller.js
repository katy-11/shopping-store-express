var Top = require("../models/model.top");

module.exports.index = async (req, res) => {
  var tops = await Top.find();
  res.render("tops/index", {
    tops: tops,
  });
};
module.exports.view = async (req, res) => {
  let id = req.params.id;
  var top = await Top.findOne({ _id: id });
  console.log(top);
  res.render("tops/singleItem", {
    top: top,
    firstFour: top.imageItem[0].slice(0, 4),
    lastFour: top.imageItem[0].slice(4),
  });
};
