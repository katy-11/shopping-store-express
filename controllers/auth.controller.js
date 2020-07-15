// var md5 = require("md5");
var bcrypt = require("bcrypt");
const saltRounds = 5;

var db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exsist"],
      values: req.body
    });
    return;
  }

  // var hashedPassword = md5(password);
  // bcrypt.hash('123', saltRounds, function(err, hash) {
  //     // Store hash in your password DB.
  //     console.log(hash, "mat khau");
  //   }
  // );
  let wrongLoginCount = 0;
  bcrypt.compare(password, user.password, function(err, result) {
    console.log('buoc 1');
    console.log(password)
    if (result === false) {
      console.log('buoc 2');      
      wrongLoginCount = wrongLoginCount + 1;
      console.log(wrongLoginCount);

      if (wrongLoginCount === 4) {
        res.render("auth/login", {
          errors: ["You entered wrong password 4 times"],
          values: req.body
        });
      } else {
        res.render("auth/login", {
          errors: ["Wrong password"],
          values: req.body
        });
      }
    } else {
      console.log("logged in")
      res.cookie("userId", user.id, {
        signed: true
      });

      res.redirect("/transactions/userTransaction");
    }
  });
};
