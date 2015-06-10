require('node-jsx').install()

var express = require('express')
  , app = express()
  , React = require('react/addons')
  , components = require('./public/components.jsx')

var HelloMessage = React.createFactory(components.HelloMessage)


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index')
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
