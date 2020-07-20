var express = require('express');

var controller = require('../controllers/top.controller');

var Router = express.Router('');

Router.get('/', controller.index) ;

module.exports = Router;