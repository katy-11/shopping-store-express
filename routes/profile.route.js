var express = require('express');
var multer = require('multer');

var controller = require('../controllers/profile.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middleware/auth.middleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    // console.log(file)
    cb(null, file.originalname);
  }
});
var upload = multer({ 
  storage: storage
});

var profileRouter = express.Router('');

profileRouter.get('/', controller.index);

profileRouter.post('/', 
                upload.single('avatar'), 
                validate.postViewUpdate, 
                controller.postUpdate);

module.exports = profileRouter;