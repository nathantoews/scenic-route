require('node-jsx').install()

var express = require('express')
  , app = express()
  , session = require('express-session')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , findOrCreate = require('mongoose-findorcreate')
  , passport = require('passport')
  , fb = require('passport-facebook').Strategy
  , React = require('react/addons')
  , components = require('./public/components.jsx')
  , auth = require('./auth.js')


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

// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var HelloMessage = React.createFactory(components.HelloMessage)

app.set('view engine', 'jsx');
var options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

mongoose.connect('mongodb://localhost:27017/scenic');
var api_cache = [];

// Here are your database schemas!
var UserSchema = new Schema
(
	{
		authId: Number,
		type: {
				type: String, 
				enum: ['fb','google','twitter']
		},
		name: String,
		created: { 
			type: Date, 
			default: Date.now 
		}
	}
);
UserSchema.plugin(findOrCreate);
var User = mongoose.model('User', UserSchema)

// fb strategy configuration
passport.use(new fb({
	 clientID: auth.facebook.clientID,
	 clientSecret: auth.facebook.clientSecret,
	 callbackURL: auth.facebook.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		 process.nextTick(function () {
		 	User.findOrCreate({authId: profile.id, type: 'fb'}, function(err, click, created){
		 		console.log("Was this created?", created);
				console.log("Was there an error?", err);
		 	})
		 	api_cache.push(profile);
		  	return done(null, profile);
		 });
	}
));

// authenticate via facebook
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




