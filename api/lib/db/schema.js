var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, findOrCreate = require('mongoose-findorcreate')
	, _ = require('underscore')

// Model and Schema name must match.
var Schemas = {
	User: new Schema
	(
		{
			authId: Number,
			type: {
					type: String, 
					enum: ['fb','google','twitter']
			},
			name: String,
			created: { 
				type: Date, 
				default: Date.now 
			},
			routes: []
		}
	) 
};

// Adding findOrCreate plugin to each.
_.each(Schemas, function(val,prop,Schemas){
	Schemas[prop] = val.plugin(findOrCreate);
})

module.exports = Schemas;