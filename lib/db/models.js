var mongoose = require('mongoose')
, 	Schemas = require('./schema.js')

module.exports = function(model){
	if (Schemas && Schemas[model]){
		return mongoose.model(model, Schemas[model]);	
	}
	else
	{
		throw "The model you requested doesn't match a schema! Look at schema.js";
	}
}