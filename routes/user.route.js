var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middleware/auth.middleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})
var upload = multer({ 
  storage: storage
});

var userRouter = express.Router('');

userRouter.get('/', controller.index);

userRouter.get('/cookie', controller.cookie);

userRouter.get('/create', controller.create);

userRouter.get('/view/:id', controller.view);

userRouter.get('/view/:id/update', controller.viewUpdate);

userRouter.get('/view/:id/delete', controller.viewDelete);

userRouter.post('/create', 
                upload.single('avatar'), 
                validate.postCreate, 
                controller.postCreate);

userRouter.post('/view/:id/update', validate.postViewUpdate, controller.postViewUpdate);

module.exports = userRouter;