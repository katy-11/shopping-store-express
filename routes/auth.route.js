var express = require('express');

var controller = require('../controllers/auth.controller');

var authRouter = express.Router('');

authRouter.get('/login', controller.login);

authRouter.post('/login', controller.postLogin);

module.exports = authRouter;