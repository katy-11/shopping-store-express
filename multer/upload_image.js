var multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, files, cb) {
    cb(null, './public/uploads/')
  },
  filename: function(req, file, cb) {
    // console.log(file);
    cb(null, file.originalname)
  }
});
var upload = multer({ 
  storage: storage
});

module.exports = upload;