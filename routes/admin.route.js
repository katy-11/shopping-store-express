var express = require('express');

var controller = require('../controllers/admin.controller');
var upload = require('../multer/upload_image');

var Router = express.Router('');

Router.get('/', controller.index);

Router.get('/create', controller.create);

Router.post('/create', upload.single('imageUrl'), controller.postCreate);

module.exports = Router;