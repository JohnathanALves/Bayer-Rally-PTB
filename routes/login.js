var express = require('express');
var router  = express.Router();


module.exports = function(passport){



  router.post('/',  passport.authenticate('login', {
    successRedirect : 'login/successJson',
    failureRedirect : 'login/failuresJson',
  }));

  router.get('/successJson', function(req, res, next){
    return res.json({status: 'true'});
  });

  router.get('/failuresJson', function(req, res, next){
    return res.json({status: 'false'});
  });

  router.get('/teste', function(req, res, next){
    var testeController = require('../controllers/teste');
    testeController(req, res, next);
  });
  return router;
}
