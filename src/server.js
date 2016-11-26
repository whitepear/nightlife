var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session); // require and call with session in order to allow connect-mongo middleware to access sessions

var app = express();
var db; // database variable

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Utilise connection pooling, initialise app after db connection
// & session-store is established
MongoClient.connect('mongodb://localhost:27017/nightlife', function(err, database) {
  if(err) throw err;

  db = database;
  app.use(session({
	  secret: 'secret_placeholder',
	  store: new MongoStore({
	  	db: db
		}),
	  resave: true,
	  saveUninitialized: false
	}));
  app.listen(3000);
  console.log('Server is running...');
});

app.get('/', function(req, res) {
	res.send('hi.');
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;