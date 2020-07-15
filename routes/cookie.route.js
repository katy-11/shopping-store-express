var express = require('express');

var cookieRouter = express.Router('');
var i = 1;
cookieRouter.get('/', (req, res) => {
  res.cookie('user-id', 12345);
  console.log('You visited this page ' + i + ' times');
  i++;
  res.send('Welcomeee!');
});

module.exports = cookieRouter;
