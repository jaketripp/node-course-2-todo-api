var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PROD_MONGODB);

module.exports = {mongoose};

// mongodb://jake:jake@ds235775.mlab.com:35775/node-todo-api

// heroku config:set PROD_MONGODB=mongodb://jake:jake@ds235775.mlab.com:35775/node-todo-api

