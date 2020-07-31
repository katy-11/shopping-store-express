var Top = require('../models/model.top');

module.exports.index = async (req, res) => {
  var tops = await Top.find();
  res.render('admin/index', {
    tops: tops
  });
};

module.exports.create = async (req, res) => {
  var tops = await Top.find(); 
  res.render('admin/create', {
    tops: tops
  });
}; 


module.exports.postCreate = async (req, res) => {
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
      { public_id: `kattie/tops/${uniqueFilename}`, tags: `tops` }, // directory and tags are optional
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
    req.body.imageUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/" +
      uniqueFilename;
  } else {
    req.body.imageUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593021031/testProjectGlitch/defaultAvatar.png";
  }
  var top = await Top.create(req.body);
  res.redirect('/admin/create');
};

