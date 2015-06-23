require('node-jsx').install()

var express = require('express')
  , app = module.exports = express()
  // , session = require('express-session')
  , mongoose = require('mongoose')
  , User = require('./lib/db/models.js')('User')
  , passport = require('./lib/auth/configured_passport.js')
  , React = require('react/addons')
 

// Express App Initialization

app.use(express.static(__dirname + '/public'))	

app.set('view engine', 'jsx');
var options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

mongoose.connect('mongodb://localhost:27017/scenic');

// Routes below
app.get('/', function(req, res){
		var data =
		[
		  {
		    "author": "Pete Hunt",
		    "text":"This is Pete's comment"
		  },
		  {
		    "author": "Andrew Louis",
		    "text":"This is Andrew's comment"
		  }
		];
		res.render('index', {data:data})
	}
)
app.get('/users', function(req,res){
	User.find().exec(function(err,suc){
		res.send(suc);
	});
});

app.get('/debug', function(req, res){
	User.find().exec(function(err,users){
		res.send(users);	
	})
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})




