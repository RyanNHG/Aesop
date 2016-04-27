var userApi = require('./user');
var fableApi = require('./fable');
var mongoose = require('mongoose');
var credentials = require('./credentials');

module.exports = function(app){

  const route = '/api';

  // Connect to MongoDB
  console.log('Connecting to MongoLab as ' + credentials.username + '...');
  var dbUrl = 'mongodb://'+credentials.username+':'+credentials.password+'@ds013918.mlab.com:13918/aesop-db'
  mongoose.connect(dbUrl);
  console.log('...connected!');

  // Call API modules
  userApi(app);
  fableApi(app);

  app.get(route, function(req, res) {
  	res.status(200).send('api data');
  })

}
