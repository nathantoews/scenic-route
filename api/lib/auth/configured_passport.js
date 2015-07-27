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
		cookie: { maxAge: 600000 }
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
	 profileFields: ['id', 'displayName', 'photos'],
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

app.get('/google-debug', function(req, res){
	res.send(api_cache);	
})
app.get('/auth/facebook',
	passport.authenticate('facebook')
);
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) 
	{
	    console.log('we b logged in!')
	    console.dir(req.user)
	    res.cookie('authenticated', 'true', { maxAge: 600 * 1000 });
	    res.cookie('authId', req.user.id, { maxAge: 600 * 1000 });
	    res.cookie('type','fb',{ maxAge: 600 * 1000 });
	    res.cookie('displayName', req.user.displayName, { maxAge: 600 * 1000 });
	    /*
		 * Check for if the user has 0 pictures?
	     */
	    if (req.user._json.picture.data.is_silhouette == false){
	    	res.cookie('profileUrl', req.user.photos[0].value, { maxAge: 600 * 1000 });
	    }

	    res.redirect('http://localhost:3001');
	}
);
app.get('/auth/google', 
	passport.authenticate('google', { 
		scope: auth.google.scope 
	})
);
app.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('google: authenticated, cookies sent.');
    console.dir(req.user)	
    res.cookie('authenticated', 'true', { maxAge: 600 * 1000 });
    res.cookie('authId', req.user.id, { maxAge: 600 * 1000 });
    res.cookie('type','google',{ maxAge: 600 * 1000 });    
   	res.cookie('displayName', req.user.displayName, { maxAge: 600 * 1000 });
	
	if (!req.user._json.image.isDefault){
		res.cookie('profileUrl', req.user.photos[0].value, { maxAge: 600 * 1000 });
	}

    res.redirect('http://localhost:3001');
 });

module.exports = passport;