var express = require('express');
var router  = express.Router();

var isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated())
		return res.json({status: 'true'});
	// if the user is not authenticated then redirect him to the login page
	return res.json({status: 'false'});
}

module.exports = function(passport){

  router.get('/islog', function(req, res, next){
    if(req.isAuthenticated()){
      return res.json({status:'true'});
    } else {
      return res.json({status:'false'});
    }
  });

  router.get('/isvendedor', cors(),function(req, res, next){
    if(req.isAuthenticated()){
      if(req.user.isVendedor){
        return res.json({status:'true'});
      } else {
        return res.json({status:'false'});
      }
    }
  });

  router.post('/',  passport.authenticate('login', {
    successRedirect : 'login/successJson',
    failureRedirect : 'login/failuresJson',
  }));

  router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
  });

  router.get('/successJson', function(req, res, next){
    return res.json({status: 'true'});
  });

  router.get('/failuresJson', function(req, res, next){
    return res.json({status: 'false'});
  });

  router.get('/successJson', function(req, res, next){
    return res.json({status: 'true'});
  });

  router.get('/teste', function(req, res, next){
    var testeController = require('../controllers/teste')(req, res, next);
  });
  return router;
}
