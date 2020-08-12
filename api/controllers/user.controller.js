var User = require("../../models/model.user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.usersIndex = async (req, res) => {
  var users = await User.find();
  res.json(users);
};

module.exports.userSingleDetail = async (req, res) => {
  var user = await User.findOne({ _id: req.params.id });
  res.json(user);
};

module.exports.userUpdate = async (req, res) => {
  var user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, result) => res.json(user)
  );
};

module.exports.userDelete = async (req, res) => {
  var user = await User.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.send("remove not successfully");
    }
    res.send("remove successfully");
  });
};

module.exports.userSigninCheck = async (req, res) => {
  User.findOne({
    email: req.body.signinEmail,
  }).exec((err, user) => {
    if (!user) {
      res.send(false);
      return;
    } else {
      bcrypt.compare(req.body.signinPassword, user.password, function (
        err,
        result
      ) {
        // result = false
        if (result === false) {
          console.log(user, 2);
          res.send(false);
        } else {
          console.log(user, 3);
          res.send(true);
        }
      });
    }
  });
};
