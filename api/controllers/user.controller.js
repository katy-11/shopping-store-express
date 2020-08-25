var User = require("../../models/model.user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.usersIndex = async (req, res) => {
  var users = await User.find();
  res.json(users);
};

module.exports.userSingleDetail = async (req, res) => {
  try {
    var user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.userUpdate = async (req, res) => {
  try {
    var user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, result) => res.json(result)
    );
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.cartUpdate = async (req, res) => {};

module.exports.userDelete = async (req, res) => {
  try {
    var user = await User.findByIdAndRemove(req.params.id, (err, result) => {
      res.send("remove successfully");
    });
  } catch (error) {
    res.send("remove not successfully");
    res.sendStatus(404);
  }
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
          // console.log(user, 2);
          res.send(false);
        } else {
          // console.log(user, 3);
          res.send(true);
        }
      });
    }
  });
};
