var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.locals.moment=require('moment');
//mongoose.connect('mongodb://localhost/moviestore');
mongoose.createConnection('mongodb://localhost/moviestore');

// view engine setup
app.set('port', process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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


app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//路由
app.get('/', function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: '首页',
			movies: movies
			// [{
			// 	title: '机械战警',
			// 	_id: 1,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },{
			// 	title: '机械战警',
			// 	_id: 2,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },{
			// 	title: '机械战警',
			// 	_id: 3,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },{
			// 	title: '机械战警',
			// 	_id: 4,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },{
			// 	title: '机械战警',
			// 	_id: 5,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },{
			// 	title: '机械战警',
			// 	_id: 6,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// }]
		})
	
	})
});

app.get('/movie/:id', function(req, res){
	var id = req.params.id
	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: movie.title + '详情页',
			movie: movie
			// {
			// 	doctor: '何塞.帕迪利亚',
			// 	country: '美国',
			// 	title: '机械战警',
			// 	year: 2014,
			// 	language: '英语',
			// 	flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			// 	summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 饰）和儿子大卫却再难从他身上感觉亲人的温暖。 　　感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击……'
			// }
		})	
	})

});

app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: '列表页',
			movies: movies
			// [{
			// 	title: '机械战警',
			// 	_id: 1,
			// 	doctor: '何塞.帕迪利亚',
			// 	country: '美国',
			// 	title: '机械战警',
			// 	year: 2014,
			// 	language: '英语',
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			// 	flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			// 	summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 饰）和儿子大卫却再难从他身上感觉亲人的温暖。 　　感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击……'
			// }]
		})
	})
});

app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: '后台管理',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
});

//post
app.post('/admin/movie/new', function(req, res){
	console.log("inin");
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	console.log("en:"+id);
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err)
			};
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err) {
					console.log(err)
				};
				res.redirect('/movie/'+ movie._id)
			})
		})
	}else{
		console.log("here");
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err, movie){
			if (err) {
				console.log(err);
			};
			res.redirect('/movie/'+ movie._id);
		})
	}
});

//update
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: '后台更新页',
				movie: movie
			})
		})
	}
});
//module.exports = app;
