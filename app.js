var express     = require('express')
  , app         = express()
  , bodyParser  = require('body-parser')
  , mongoose    = require('mongoose')

//var autoIncrement = require('mongoose-auto-increment');
// conexao com MlAB
mongoose.Promise = require('bluebird');
//var connection = mongoose.createConnection('mongodb://admin:admin@ds163679.mlab.com:63679/rallywebapp');
//autoIncrement.initialize(connection);
mongoose.connect('mongodb://admin:admin@ds163679.mlab.com:63679/rallywebapp');
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection openned ');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: 'web-app-rally-Secret-Key-LA-LA-LAND'}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var port = process.env.PORT || 8080;

var LoginRoutes     = require('./routes/login')(passport);
var VendedorRoutes  = require('./routes/vendedor')(passport);
var RevendaRoutes   = require('./routes/revenda')(passport);


app.use('/login', LoginRoutes);
app.use('/vendedor', VendedorRoutes);
app.use('/revenda', RevendaRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    status: '404',
    message: 'Not Found, hihihi',
  });
});


app.listen(port);
console.log('conectado a porta ' + port);
