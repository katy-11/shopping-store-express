var shortid = require("shortid");
var db = require("../db");

const sgMail = require("@sendgrid/mail");

module.exports.index = (req, res) => { 
  // function add(a, b) {
  //   if (typeof a !== 'string' || typeof b !== 'string') {
  //     throw new Error('Wrong type')
  //   }
  //   return a + b;
  // }
  // try {
  //   var result = add('a', 2)
  // } catch (error) {
  //   console.error(error)
  // }
  // console.log('test end')
  var usersList = db.get("users").value();
  res.render("users/index", {
    users: usersList
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.view = (req, res) => {
  var id = req.params.id;
  var matchedUser = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: matchedUser
  });
};

module.exports.viewUpdate = (req, res) => {
  res.render("users/update", {
    id: req.params.id
  });
};

module.exports.viewDelete = (req, res) => {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.cookie = (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "11hohuyen1114@gmail.com",
    from: "10hohuyen1114@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg);
  res.redirect("/users");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();

  if (req.file) {
    //uploaded file to server
    console.log("file uploaded to server");
    console.log(req.file, "buoc 1");

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "huyendxnkgd",
      api_key: 889324942995861,
      api_secret: "eImeRjRSKAj5tZlRxKJs4_2EdrE"
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `avatar` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        // res.json(image)
      }
    );
    req.body.avatarUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/blog/" +
      uniqueFilename;
  } else {
    req.body.avatarUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593021031/testProjectGlitch/defaultAvatar.png";
  }
  db.get("users")
    .push(req.body)
    .write();
  console.log(db.get("users").value());
  res.redirect("/users");
};

module.exports.postViewUpdate = (req, res) => {
  var newName = req.body.name;
  var id = req.params.id;

  if (newName) {
    db.get("users")
      .find({ id: id })
      .assign({ name: newName })
      .write();
  }

  var matchedUser = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: matchedUser
  });
};
