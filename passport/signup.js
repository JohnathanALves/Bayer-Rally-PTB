var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var Vendedor = require('../models/vendedor');
var Revenda = require('../models/revenda');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
				usernameField: 'userID',
				passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'userID' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false);
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.userID = username;
                        newUser.password = createHash(password);
												newUser.isVendedor = true;
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                return done(null, false);
                            } else {
															console.log('User Registration succesful');
															Revenda.findOne({'cnpj' : req.user.userID}, function(err, revenda){
																if (err){
																	console.log('erro ao encontrar revenda.');
																	return done(null, false);
																}
																if (revenda) {
																	console.log('revenda encontrada: ' + revenda.cnpj);
																	var newvendedor = new Vendedor();
																	newvendedor.revenda = revenda.cnpj;
																	newvendedor.cpf = newUser.userID;
																	newvendedor.email = req.body.email;
																	newvendedor.fullname = req.body.fullname;
																	newvendedor.email = req.body.email;
																	(revenda.vendedores).push = newvendedor.cpf;
																	newvendedor.save(function(err){
																		if (err){
																			console.log ('erro ao salvar newvendedor: ' + newvendedor.cpf);
																			return done(null, false);
																		}
																		revenda.save(function(err){
																			if (err){
																				console.log ('erro ao salvar novo vendedor na revenda: ' + newvendedor.cpf);
																				return done(null, false);
																			}
																		});
																	});
																}
															});
															return done(null, newUser);
														}
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
