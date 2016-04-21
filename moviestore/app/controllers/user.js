var User = require('../models/user');

// user

//show signup page
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'signup page'
	});
};
//signup
exports.signup=function(req, res) {
	var _user = req.body.user;

	User.findOne({
		name: _user.name
	}, function(err, user) {
		if (err)
			console.log(err);

		if (user) {
			console.log("user " + user.name + " already exists!")
			return res.redirect('/signin');
		} else {
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				//		console.log(user);
				res.redirect("/");
			});
		}
	});
};

//show signin page
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'signin page'
	});
};

//singin
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({
		name: name
	}, function(err, user) {
		if (err)
			console.log(err);
		if (!user) {
			return res.redirect('/signup');
		}

		user.comparePassword(password, function(err, isMatched) {
			if (err)
				console.log(err);
			if (isMatched) {
				req.session.user = user;
				console.log("login successfully");
				return res.redirect('/');
			} else {
				console.log('Password invalid!');
				return res.redirect('/signin');
			}
		});
	});
};

//logout
exports.logout =  function(req, res) {
	delete req.session.user;
//	delete app.locals.user;
	res.redirect('/');
};

//user list page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err)
		}
		res.render('userlist', {
			title: 'User列表页',
			users: users
		});
	});
};