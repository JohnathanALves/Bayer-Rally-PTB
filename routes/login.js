var express = require('express');
var router  = express.Router();


module.exports = function(passport){

  router.post('/',  passport.authenticate('login'), function(req, res){
      return res.send('true');
  });

  router.get('/teste', function(req, res, next){
    var testeController = require('../controllers/teste');
    testeController(req, res, next);
  });
  return router;
}
