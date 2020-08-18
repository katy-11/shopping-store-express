var Top = require("../models/model.top");

module.exports.search = async (req, res) => {
  var q = req.query.q;
  var matchedList = await Top.find(
    { $text: { $search: q } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });
  // console.log(matchedList);
  res.render("search/index", {
    itemList: matchedList,
  });
};
