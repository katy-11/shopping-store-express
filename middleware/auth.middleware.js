var User = require('../models/model.user');

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.user_id) {
    res.redirect('/sign/in');
    return;
  }
  var user = User.find({
    id: req.signedCookies.user_id
  });
  if (!user) {
    res.redirect('/sign/in');
    return;
  }
  res.locals.user = user;
  next();
};