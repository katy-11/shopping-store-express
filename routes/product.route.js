var express = require('express');

var controller = require('../controllers/product.controller');
var validate = require('../validate/book.validate');

var productRouter = express.Router('');

productRouter.get('/', controller.index);

module.exports = productRouter;