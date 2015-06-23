var User = require('../db/models.js')('User')
  , passport = require('passport')
  , fb = require('passport-facebook').Strategy
  , auth = require('./auth.js')

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

module.exports = passport;