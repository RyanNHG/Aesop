var Fable = require('./fable.model.js');

module.exports = function(app){

	const route = '/api/fable';

	// Sign In
	app.get(route, function(req, res) {

		if(req.query == null)
			console.log('No query!');

		var user = req.query.user;

		if(user == null) {
			res.status(500).send('No user!');
			return;
		}

		//	TODO: Get non-random fable
		Fable.count().exec(function(err, count){

			// Get random fable from collection
			var random = Math.floor(Math.random() * count);

			Fable.findOne().skip(random).exec(function (err, result) {

				if(err)
					res.status(500).send(err);
				else
					res.status(200).send(result);

			});

		});

	});



};