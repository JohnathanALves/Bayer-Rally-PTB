var bCrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Revenda = require('../models/revenda');

module.exports = function(req, res){
  var newUser = new User();
  newUser.userID    = '08819958430';
  newUser.password  =  createHash('123456');
  newUser.isVendedor = false;
  newUser.save(function(err) {
      if (err){
          console.log('Error in Saving user: '+err);
          throw err;
      }
      console.log('User Registration succesful');
      var revenda = new Revenda();
      revenda.cnpj = newUser.userID;
      revenda.email = 'a@a.com';
      revenda.razao = 'ISTO É UM TESTE';
      revenda.save(function(err){
        if(err){
          console.log('erro ao salvar nova revenda');
          return res.json('erro ao salvar nova revenda');
        }
      });
      return res.send('criou');
  });
}

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
