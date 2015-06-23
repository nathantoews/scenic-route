require('node-jsx').install()

var express = require('express')
  , app = express()
  , session = require('express-session')
  , mongoose = require('mongoose')
  , User = require('./lib/db/models.js')('User')
  , passport = require('./lib/auth/configured_passport.js')
  , fb = require('passport-facebook').Strategy
  , React = require('react/addons')
  , auth = require('./lib/auth/auth.js')

// Express App Initialization
app.use(session(
	{
		resave: true, 
		saveUninitialized: true,
		secret: 'SOMERANDOMSECRETHERE', 
		cookie: { maxAge: 60000 }
	}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/material', express.static(__dirname + '/material'));
app.use('/fonts', express.static(__dirname + '/material/fonts'));	

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
app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
	}
);
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) 
	{
		res.redirect('/');
	}
);
app.get('/users', function(req,res){
	User.find().exec(function(err,suc){
		res.send(suc);
	});
});
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
app.get('/debug', function(req, res){
	User.find().exec(function(err,users){
		res.send(users);	
	})
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})




