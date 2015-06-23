var auth = {
	facebook: {
		clientID: '937090636349988',
		clientSecret: 'd797a79d9d8be925477c86ec82872709',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'		
	},
	google: {
		clientID: '763898094830-nhnklv0v4muj6f2g40ibico92vg70l6c.apps.googleusercontent.com',
		clientSecret: 'U5JAfVRP2dYSw3-BhYKJ-mzI',
		callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
		scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
	}
};

module.exports = auth;