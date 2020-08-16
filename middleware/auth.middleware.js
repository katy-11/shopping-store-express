var User = require("../models/model.user");

module.exports.requireAuth = (req, res, next) => {
  var user = User.find({
    id: req.signedCookies.user_id,
  });
  if (!req.signedCookies.user_id) {
    // console.log(1);
    res.redirect("/sign/in");
    return;
  }
  if (!user) {
    // console.log(2);
    res.redirect("/sign/in");
    return;
  }
  res.locals.user = user;
  next();
};

module.exports.checkUser = (req, res, next) => {
  var user = User.find({
    id: req.signedCookies.user_id,
  });
  if (req.signedCookies.user_id && user) {
    res.locals.user = user;
  }
  next();
};
