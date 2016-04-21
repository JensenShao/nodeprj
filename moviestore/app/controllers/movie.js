var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');

//movie
exports.detail = function(req, res) {
	var id = req.params.id
	Movie.findById(id, function(err, movie) {
		Comment.find({movie: id})
		.populate('from','name')
		.exec(function(err, comments) {
			res.render('detail', {
				title: movie.title + '详情页',
				movie: movie,
				comments: comments
			});
		});
	});
};

exports.list = function(req, res) {
	Movie.fetch(function(err, movies) {
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
};

exports.new = function(req, res) {
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
};

//post
exports.save = function(req, res) {
	console.log("inin");
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	console.log("en:" + id);
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			};
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				};
				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
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
		_movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			};
			res.redirect('/movie/' + movie._id);
		})
	}
};

//update
exports.update = function(req, res) {
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: '后台更新页',
				movie: movie
			})
		})
	}
};

//delete
exports.del = function(req, res) {
	var id = req.query,
		id;

	if (id) {
		Movie.remove({
			_id: id
		}, function(err, movie) {
			if (err) {
				console.log(err);
				res.json({
					success: 0
				});
			} else {
				res.json({
					success: 1
				});
			}
		});
	};
}