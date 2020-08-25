var Top = require("../models/model.top");

module.exports.viewProduct = async (req, res) => {
  let id = req.params.id;
  try {
    var top = await Top.findOne({ _id: id });
    res.render("tops/singleItem", {
      top: top,
      firstFour: top.imageItem[0].slice(0, 4),
      lastFour: top.imageItem[0].slice(4),
    });
  } catch (error) {
    res.render('error');
  }
};

