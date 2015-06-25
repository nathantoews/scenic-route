var express = require('express')
  , app = module.exports = express()
  , mongoose = require('mongoose')
  , User = require('./lib/db/models.js')('User')
  , passport = require('./lib/auth/configured_passport.js')

mongoose.connect('mongodb://localhost:27017/scenic');

app.get('/users', function(req,res){
	User.find().exec(function(err,suc){
		res.send(suc);
	});
});

app.get('/user', function(req, res){
	res.send(req.session.passport);	
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})




