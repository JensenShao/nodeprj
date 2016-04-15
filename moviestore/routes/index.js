var express = require('express');
var mongoose = require('mongoose');
var Movie = require('../models/movie');
var _ = require('underscore');
var router = express.Router();

mongoose.connect('mongodb://localhost/moviestore');

/* GET home page. */
router.get('/', function(req, res, next) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'Express movie store!!!',
			movies: movies
		});
	});
});

router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'Express movie ' + movie.title,
			movie: movie
		});
	});
});

router.get('/admin/movie', function(req, res, next) {
	res.render('admin', {
		title: 'Express movie admin',
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
	});
});

router.get('/admin/update/:id',function(req,res,next){
	var id = req.params.id;
	
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'update page',
				movie:movie
			});
		});
	}
});

router.post('/admin/movie/new', function(req, res, next) {
	var id = req.body.movie._id;
	console.log(id !== 'undefined');
	var movieObj = req.body.movie;

	var _movie;
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err);
			}

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err);
				}

				res.redirect('/movie/' + movie._id);
			});
		});
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.psoter,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			}

			res.redirect('/movie/' + movie._id);
		});
	}
});

router.get('/admin/list', function(req, res, next) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'Express movie list',
			movies: movies
		});
	});

});

router.delete('/admin/list',function(req,res,next){
	var id = req.query.id;
	
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				console.log(res);
				res.json({success:1});
			}
		});
	}
});

module.exports = router;