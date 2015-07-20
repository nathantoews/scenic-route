var express = require('express'),
    app = module.exports = express(),
    cors = require('cors'),
    pg = require('pg'),
    queryBuilder = require('./queryBuilder.js');

pg.defaults.poolSize = 20;
var conString = "postgres://postgres:criticalmass@localhost:5432/postgres";

app.use(cors());

// Eg. http://104.131.189.81/greenify?origin=-79.380658,43.645388&dest=-79.391974,43.647957&greenness=3
app.get('/greenify', function(req,res){
	console.log("Received request");
	
	var start = (new Date()).getTime(); 

	var directions = {
		origin: req.query.origin.trim(),
		destination: req.query.dest.trim()
	};

	var greenness = req.query.greenness.trim();

	pg.connect(conString, function(err, client, done) {
	  if(err) {
	    res.send(err);
	    return console.error('error fetching client from pool', err);
	  }
	  
	  client.query(queryBuilder.initialization());
	  client.query(queryBuilder.waypoints(directions));
	  
	  client.query('select p_scenic_route('+ greenness +')' , function(err, result) {
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
	    console.log(result.rows);
	    result.rows.map(function(obj){
		//var clean = (obj.scenic_route.split("(")[2]).split(")")[0].replace(" ",",");
		var row = obj.p_scenic_route;
		
		// Getting rid of bounding round brackets
		row = row.substring(1,row.length-1)
		row = row.split(",");
		
		// row[0] is (x y) (x y)...
		console.log(row[1]);
		row[0] = "[" + row[0].split("\"").join("").split("(").join("[").split(")").join("]").split(" ").join(",") + "]";
	    	row[1] = row[1].split("\"").join("").split("-");
		greenpoints.push({scenic_route: JSON.parse(row[0]), names: row[1]})
		});

	    res.send({results: greenpoints});
	  });
	});
});


app.listen(80, function(){
	console.log("Listening on Port 80");
});
