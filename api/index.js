var userApi = require('./user');
var mongoose = require('mongoose');
var credentials = require('./credentials');

module.exports = function(app){

  const route = '/api';

  console.log('Connecting to MongoLab as ' + credentials.username + '...');
  var dbUrl = 'mongodb://'+credentials.username+':'+credentials.password+'@ds013918.mlab.com:13918/aesop-db'

  mongoose.connect(dbUrl);
  console.log('...connected!');

  userApi(app);

  app.get(route, function(req, res) {
  	res.status(200).send('api data');
  })

}
