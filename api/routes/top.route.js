var express = require('express');

var controller = require('../controllers/top.controller');

var Route = express.Router('');

Route.get('/top', controller.index);

Route.get('/top/database', controller.database);


Route.post('/top', controller.topCreate);

Route.get('/top/:id', controller.topViewSingle);

Route.put('/top/:id', controller.topUpdate);

Route.delete('/top/:id', controller.topDelete);

module.exports = Route;