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

var isRevenda = function (req, res, next) {
  if(isAuthenticated)
		if(!req.user.isVendedor)
    	return next();
		return res.send('Não Autorizado, Somente Revendas podem acessar esta parte');
  return res.send('Não Logado, Somente Revendas podem acessar esta parte');
}

module.exports = function(passport){


  router.post('/vendedor/novo', isRevenda, function(req, res, next){
		var cadastra = require('../controllers/vendedorSignup')(req, res, next);
  });

	 router.post('/produto/novo', isRevenda, function(req, res, next){
	 	var novoProduto = require('../controllers/produtoCreate')(req, res, next);
	 });

  return router;
}
