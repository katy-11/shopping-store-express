var User = require("../models/model.user");

module.exports.profile = async (req, res) => {
	res.render('user/profile')
}

module.exports.postProfile = async (req, res) => {
	if (req.file) {
    //uploaded file to server
    console.log("file uploaded to server");

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "huyendxnkgd",
      api_key: 889324942995861,
      api_secret: "eImeRjRSKAj5tZlRxKJs4_2EdrE",
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `kattie/avatar/${uniqueFilename}`, tags: `avatar` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        // res.json(image)
      }
    );
    req.body.avatar =
      "https://res.cloudinary.com/huyendxnkgd/image/upload/v1597764332/kattie/avatar/" +
      uniqueFilename;
    let user = await User.updateOne(
		{_id: req.params.id}, 
		req.body);
  } else {
	let user = await User.updateOne(
		{_id: req.params.id}, 
		req.body, 
		(err, result) => console.log("updated else"));
	}
	res.redirect('/user/profile');
}
