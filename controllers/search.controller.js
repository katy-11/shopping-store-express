var Product = require("../models/model.product");

module.exports.search = async (req, res) => {
  let q = req.query.q;
  let matchedList = await Product.find(
    { $text: { $search: q } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" }});
  res.render("search/index", {
    itemList: matchedList,
  });
};
