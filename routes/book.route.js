var express = require('express');

var controller = require('../controllers/book.controller');
var validate = require('../validate/book.validate');

var bookRouter = express.Router('');

bookRouter.get('/', controller.index);

bookRouter.get('/create', controller.create);

bookRouter.get('/view/:id', controller.view);

bookRouter.get('/view/:id/edit', controller.viewEdit);

bookRouter.get('/view/:id/delete', controller.viewDelete);

bookRouter.post('/create', validate.postCreate, controller.postCreate);

bookRouter.post('/view/:id/edit', validate.postViewEdit, controller.postViewEdit);

module.exports = bookRouter;