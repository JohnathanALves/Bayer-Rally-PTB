var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var Vendedor = require('../models/vendedor');
var Revenda = require('../models/revenda');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(req, res, next) {
  var userID    = req.body.userID;
  var userpass  = req.body.password;
  var usermail  = req.body.email;
  var userFullName = req.body.fullname;
  var revendaID = req.user.userID;

  console.log(userID);
  console.log(userpass);
  console.log(usermail);
  console.log(userFullName);
  console.log(revendaID);

  if(userID == undefined || userpass == undefined || usermail == undefined || userFullName == undefined || revendaID == undefined){
    console.log('Existem dados inválidos:');
    return res.json('Existem dados inválidos:');
  }
  User.findOne({'userID' : userID}, function (err, user ){
    if(err){
      console.log ('erro ao buscar userID: '+ err);
      return res.json('erro');
    }
    if(user){
      console.log('ja existe este usuario! : '+ user);
      return res.json('ja existe este usuario! : '+ user);
    } else{
      console.log ('DEbug3');
      var newUser = new User();
      newUser.userID        = userID;
      newUser.password      = createHash(userpass);
      newUser.isVendedor    = true;
      var newVendedor       = new Vendedor();
      newVendedor.cpf       = newUser.userID;
      newVendedor.email     = usermail;
      newVendedor.fullName  = userFullName;
      newVendedor.revenda   = revendaID;
      newUser.save(function(err){
        if(err){
          console.log ('erro ao salvar newUser: '+ err);
          return res.json('erro');
        }
      });
      newVendedor.save(function(err){
        if(err){
          console.log ('erro ao salvar newVendedor: '+ err);
          return res.json('erro');
        }
      });
      console.log('aqui');
      Revenda.findOne({'cnpj':revendaID}, function(err, revenda){
        if(err){
          console.log ('erro ao buscar revenda by ID: '+ err);
          return res.json('erro');
        }
        if(revenda){
          console.log('aqui');
          (revenda.vendedores).push = newVendedor.cpf;
          revenda.save(function(err){
            if(err){
              console.log ('erro ao adicionar vendedor na revenda: '+ err);
              return res.json('erro');
            }
            return res.json('criou');
          });
        }
        console.log('aquii');
      });
    }
  });
}

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
