module.exports.postSignin = (req, res, next) => {
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  var errors = [];
  if (!emailRegex.test(req.body.signinEmail)) {
    errors.push("Please enter valid email");
  }
  if (req.body.signinPassword.length > 20) {
    errors.push("Password is less than 20 characters");
  }

  if (errors.length) {
    res.render("sign/signin", {
      errors: errors,
      values: req.body,
    });
    return;
  }
  next();
};

module.exports.postSignup = (req, res, next) => {
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  var errors = [];
  if (!emailRegex.test(req.body.signupEmail)) {
    error.push("Please enter valid email");
  }
  if (req.body.signupPassword.length < 6) {
    errors.push("Password must be longer than 6 character");
  }
  if (req.body.signupName == null || req.body.signupName == "") {
    errors.push("Password is less than 20 characters");
  }
  if (isNaN(req.body.signupPhone) || req.body.signupPhone.length != 10) {
    errors.push("Please enter valid phone number");
  }
  if (errors.length) {
    res.render("sign/signup", {
      errors: errors,
      values: req.body,
    });
    return;
  }
  next();
};
