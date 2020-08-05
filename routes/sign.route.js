var express = require('express');

var controller = require('../controllers/sign.controller');

var Router = express.Router('');

Router.get('/up', controller.signup);

Router.post('/up', controller.postSignup);

Router.post('/in', controller.postSignin);

module.exports = Router;