var express = require('express');

var controller = require('../controllers/sign.controller');
var validate = require('../validate/user.validate');

var Router = express.Router('');

Router.get('/up', controller.signup);

Router.get('/in', controller.signin);

Router.post('/up', controller.postSignup);

Router.post('/in', validate.postSignin, controller.postSignin);

module.exports = Router;