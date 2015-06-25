require('node-jsx').install()

var express = require('express')
  , app = module.exports = express()
  , mongoose = require('mongoose')
  , User = require('./lib/db/models.js')('User')
  , passport = require('./lib/auth/configured_passport.js')
  , React = require('react/addons')

app.use(express.static(__dirname + '/public'));
app.use('/material', express.static(__dirname + '/material'));
app.use('/fonts', express.static(__dirname + '/material/fonts'));	

app.set('view engine', 'jsx');
var options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

mongoose.connect('mongodb://localhost:27017/scenic');

// Routes below
app.get('/', function(req, res){
		res.render('index', {user:req.session.passport})
	}
)
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




