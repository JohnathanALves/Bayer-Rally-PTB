var express = require('express');
var router  = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	return res.send('nao entrou');
}

var isVendedor = function (req, res, next) {
  if(isAuthenticated && req.user.isVendedor)
    return next();
  return res.send('teste');
}

module.exports = function(passport){

  router.get('/wow', isAuthenticated , function(req, res, next){
    return res.send('uhuuul1');
  });

  router.get('/teste', isVendedor , function(req, res, next){
    return res.send('uhuuul');
  });

  return router;
}
