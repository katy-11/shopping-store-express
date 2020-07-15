var db = require("../db");

module.exports.index = (req, res) => {
  res.render("users/profile", {
    id: req.params.id
  });
};

module.exports.postUpdate = (req, res) => {
  var newName = req.body.name;

  if (newName) {
    db.get("users")
      .find({
        id: req.signedCookies.userId
      })
      .assign({ name: newName })
      .write();
  }

  if (req.file) {
    //uploaded file to server
    console.log("file uploaded to server");

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
      { public_id: `testProjectGlitch/${uniqueFilename}`, tags: `avatar` }, // directory and tags are optional
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
    db.get("users")
      .find({
        id: req.signedCookies.userId
      })
      .assign({
        avatarUrl:
          "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/testProjectGlitch/" +
          uniqueFilename
      })
      .write();
  }

  //Render new info
  res.redirect("/users");
};
