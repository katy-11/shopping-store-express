var Top = require("../../models/model.top");

module.exports.productIndex = (req, res) => {
  res.render("dist/index");
};

module.exports.productDatabase = async (req, res) => {
  var tops = await Top.find();
  res.json(tops);
};

module.exports.productCreate = async (req, res) => {
  var top = await Top.create(req.body);
  res.json(top);
};

module.exports.productViewSingle = async (req, res) => {
  try {
    var top = await Top.findOne({ _id: req.params.id });
    res.json(top);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productUpdate = async (req, res) => {
  try {
    var top = await Top.update(
      { _id: req.params.id },
      req.body);
    res.json(top);
  }  catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productDelete = async (req, res) => {
  var top = await Top.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send("remove not successfully");
    }
    if (!top) {
      res.sendStatus(404);
      return;
    }
    res.send("remove successfully");
  });
};
