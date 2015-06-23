var app = require('../../app')
	, session = require('express-session')
	, User = require('../db/models.js')('User')
	, passport = require('passport')
	, fb = require('passport-facebook').Strategy
	, twitter = require('passport-twitter').Strategy
	, google = require('passport-google-oauth').OAuth2Strategy
	, auth = require('./auth.js')

var api_cache = [];

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

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


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
		  	return done(null, profile);
		 });
	}
));
passport.use(new google({
    clientID: auth.google.clientID,
    clientSecret: auth.google.clientSecret,
    callbackURL: auth.google.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ authId: profile.id, type: 'google' }, function (err, click, created) {
    api_cache.push(profile);
      return done(err, profile);
    });
  }
));
// passport.use(new twitter({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

app.get('/google-debug', function(req, res){
	res.send(api_cache);	
})
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
app.get('/auth/google', 
	passport.authenticate('google', { 
		scope: auth.google.scope 
	}),
	function(req,res){
		res.redirect('/');
	}
);
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
 });
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = passport;