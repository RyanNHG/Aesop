var User = require('./user.model.js');

module.exports = function(app){

	const route = '/api/user';

	// Sign In
	app.get(route, function(req, res) {

		var user = req.query;

		if(!user.email || !user.password)
		{
			res.status(500).send('Need email and password.');
			return;
		}

		// Query database to check for user.
		User.findOne({ 
			email: user.email, 
			password: user.password
		}, function (err, user) {
		  if (!user)
		  	res.status(500).send(null);
		  else
			res.status(200).send(user);
		});

	});

	// Sign Up
	app.post(route, function(req, res) {

		var user = req.query;

		if(!user.email || !user.password)
		{
			console.log(req.body, req.query);
			res.status(200).send('Need email and password.');
			return;
		}

		// Create a user from 
		var newUser = new User(user);

		newUser.save({isNew:true}, function(err, user){
			if(err)	res.status(500).json(err)
			else res.status(200).send(user);
		});

	});



};