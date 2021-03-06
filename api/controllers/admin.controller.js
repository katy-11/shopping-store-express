var Product = require("../../models/model.product");

module.exports.create = async (req, res) => {
  var products = await Product.find();
  res.render("admin/create", {
    products: products,
  });
};

module.exports.postCreate = async (req, res) => {
  if (req.file) {
    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "huyendxnkgd",
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `kattie/products/${req.body.category}/${uniqueFilename}`},
      function (err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
      }
    );
    req.body.imageUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/kattie/products/"
      + req.body.category + "/" 
      + uniqueFilename;
  } else {
    req.body.imageUrl =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593021031/testProjectGlitch/defaultAvatar.png";
  }
  var product = await Product.create(req.body);
  res.redirect("/admin/create");
};

module.exports.postUploadSinglePDImage = async (req, res) => {
  var color = req.body.color;
  var imageItemArray = [];

  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: "huyendxnkgd",
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  for (var i = 0; i < req.files.length; i++) {
    const path = req.files[i].path;
    path.replace("\\", "/");
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `kattie/${uniqueFilename}`, tags: `${color}` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        console.log("https://res.cloudinary.com/huyendxnkgd/image/upload/kattie/" +
        uniqueFilename);
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
      }
    );
    imageItemArray.push(
      "https://res.cloudinary.com/huyendxnkgd/image/upload/kattie/" +
        uniqueFilename
    );
  } 
  try {
    let product = await Product.updateOne(
      { _id: req.body.id },
      { $push: { imageItem: [imageItemArray] } }
    );
    res.redirect("/admin/create");
  } catch (error) {
    console.log(error)
  }
};
