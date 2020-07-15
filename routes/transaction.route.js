var express = require('express');

var controller = require('../controllers/transaction.controller.js');

var transactionRouter = express.Router('');

transactionRouter.get('/', controller.index);

transactionRouter.get('/book/:id', controller.book);

transactionRouter.get('/book/:id/complete', controller.bookComplete);

transactionRouter.get('/userTransaction', controller.userTransaction);

transactionRouter.get('/create', controller.create);

transactionRouter.post('/create', controller.postCreate);

module.exports = transactionRouter;