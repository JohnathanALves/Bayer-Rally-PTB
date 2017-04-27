var express = require('express');
var router  = express.Router();


module.exports = function(passport){

	router.get('pedido/novo', function(req, res, next){
		if(req.isAuthenticated()){
			if(req.user.isVendedor){
				var pedidoCreate = require('../controllers/pedidoCreate')(req, res, next);
			} else {
				return res.json({status:'false'});
			}
		}
	});

  return router;
}
