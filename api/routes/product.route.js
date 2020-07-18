var express = require('express');

var controller = require('../controllers/product.controller');

var productRouter = express.Router('');

productRouter.get('/', controller.index);
productRouter.get('/view', controller.view);

productRouter.post('/create', controller.create);

module.exports = productRouter;