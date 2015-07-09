var express = require('express'),
    app = module.exports = express(),
    cors = require('cors'),
    pg = require('pg'),
    queryBuilder = require('./queryBuilder.js');

pg.defaults.poolSize = 20;
var conString = "postgres://postgres:criticalmass@localhost:5432/postgres";

app.use(cors());

// Eg. http://104.131.189.81/greenify?origin=-79.380658,43.645388&dest=-79.391974,43.647957
app.get('/greenify', function(req,res){
	console.log("Received request");
	
	var start = (new Date()).getTime(); 

	var directions = {
		origin: req.query.origin.trim(),
		destination: req.query.dest.trim()
	};

	pg.connect(conString, function(err, client, done) {
	  if(err) {
	    res.send(err);
	    return console.error('error fetching client from pool', err);
	  }
	  
	  client.query(queryBuilder.initialization());
	  client.query(queryBuilder.waypoints(directions));
	  
	  client.query('select scenic_route()' , function(err, result) {
	    //call `done()` to release the client back to the pool
	    done();
	    if(err) {
	      return console.error('error running query', err);
	      res.send(err);
	    }
	    client.end();

	    var elapsed = ((new Date()).getTime()-start)/1000;
	    console.log("Time Elapsed:\n", elapsed);

	    // Clean up malformed reponse	
	    var greenpoints = [];	
	    result.rows.map(function(obj){
		//var clean = (obj.scenic_route.split("(")[2]).split(")")[0].replace(" ",",");
		var myString = obj.scenic_route;

		myString = myString.replace(/"/g,'');

		// Get everything in parentheses
		var start = myString.indexOf('{')
		var stop = myString.indexOf('}');
		myString = myString.substring(start+1,stop);

		// Replace round brackets with angular ones!
		var clean = new String();
		clean += "[";
		for (var i = 0; i < myString.length; i++){
   			if (myString[i] == ')') 
        			clean += ']';
   			else if (myString[i] == '(')
        			clean += '[';
   			else if (myString[i] == ' ')
        			clean += ',';
   			else
        			clean += myString[i];
		}
		clean += "]";
	    	greenpoints.push({scenic_route: clean});
	    });	

	    res.send({results: greenpoints});
	  });
	});
});


app.listen(80, function(){
	console.log("Listening on Port 80");
});
