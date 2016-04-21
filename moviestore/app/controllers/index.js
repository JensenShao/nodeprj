var Movie = require('../models/movie');

// index page
exports.index = function(req, res) {
	console.log("User in Session: ");
	console.log(req.session.user);

	Movie.fetch(function(err, movies) {
		console.log("Fetching movie");
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: '首页',
			movies: movies
		});
	});
};