var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');


//var routes = require('./routes/index');
//var users = require('./routes/users');

var dbUrl = 'mongodb://localhost/moviestore';

var app = express();
app.locals.moment = require('moment');
//mongoose.connect('mongodb://localhost/moviestore');
mongoose.createConnection(dbUrl);


// view engine setup
app.set('port', process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var mongoStore = require('connect-mongo/es5')(session);

app.use(session({
	secret:'Movie Store',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}));

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//var err = new Error('Not Found');
//err.status = 404;
//next(err);
//});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: err
//  });
//});
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//res.status(err.status || 500);
//res.render('error', {
//  message: err.message,
//  error: {}
//});
//});

app.use(function(err, req, res, next) {
	var meta = '[' + new Date() + '] ' + req.url + '\n';
//	errorLog.write(meta + err.stack + '\n');
	console.log(meta + err.stack + '\n');
	next();
});

require('./config/routes')(app);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});


//module.exports = app;