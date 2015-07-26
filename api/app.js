var express = require('express')
  , app = module.exports = express()
  , mongoose = require('mongoose')
  , User = require('./lib/db/models.js')('User')
  , passport = require('./lib/auth/configured_passport.js')
  , bodyParser = require('body-parser')
  , cors = require('cors')

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

mongoose.connect('mongodb://localhost:27017/scenic');

app.get('/users', function(req, res){
	User.find().exec(function(err, suc){
		console.log(suc);
		res.send(suc);
	});
});

app.post('/save-route', function(req, res) {
    
  var authId = req.body.authId,
      type = req.body.type,
      // should receive trimmed down active path.
      route = req.body.route;

	console.log("Hit Save Route");
	console.log("authId", authId);
	console.log("type", type);    

    User.findOne({
    	authId: authId, 
    	type: type
    },function(err, user){
    	if (err){
    		res.send(err);
    	}
    	console.log('err', err);
      
      if (!user.routes)
        user.routes = [];

    	user.routes.push(route);
    	user.markModified('routes');
    	user.save(function(){
    		console.log("Saved Route!");
    		res.send('200');
    	});
    })
});


app.get('/favourite-routes', function(req, res){
  var authId = req.query.authId,
      type = req.query.type;

  console.log("authId", authId);
  console.log("type", type);


  User.findOne({
    authId: authId,
    type: type
  }, function(err, user){
    console.log('err', err);
    console.log('user', user);
    res.send(user.routes);
  })
})
// app.get('/user', function(req, res){
// 	res.send(req.session.passport);	
// })

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})




