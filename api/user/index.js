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
		  	res.status(500).send('Email or password invalid.');
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
			if(err)	res.status(500).json('User with that email already exists.');
			else res.status(200).send(user);
		});

	});

	app.put(route, function(req, res) {

        if(!req.query || !req.query.user)
            res.status(500).send('No user data provided');
        else
        {
        	var newUser = JSON.parse(req.query.user);

            User.findOne({ 
				email: newUser.email, 
				password: newUser.password
			}, function(err, user){

            	console.log(err, user)

                if(!user) res.status(500).send('User not found');

                else {
	             
	                user.email = newUser.email;
	                user.password = newUser.password;
	                user.fableData = newUser.fableData;

	                user.save(function(err) {
	                    
	                    if(err) 
	                        res.status(500).send(err);

	                    res.status(200).send(user);
	                });
	            }

            });
        }

    })


};