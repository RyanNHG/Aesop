var userApi = require('./user');
var fableApi = require('./fable');
var mongoose = require('mongoose');

module.exports = function(app){

  const route = '/api';

  // Connect to MongoDB
  var dbUrl = 'mongodb://' + (process.env.MONGO_USER) + ':' + (process.env.MONGO_PWD) + '@ds013918.mlab.com:13918/aesop-db'
  mongoose.connect(dbUrl);

  // Call API modules
  userApi(app);
  fableApi(app);

  app.get(route, function(req, res) {
  	res.status(200).send('api data');
  })

}
