var queryBuilder = {
	initialization: function(){
		var init = new String();
		init += "drop table if exists waypoints;";
		init += "create table waypoints(gid serial primary key,location geometry(Point,4326));";
		return init;
	},
	waypoints: function(locations){
		var wayPoint = new String();
		var index = 1;
		for (var location in locations){
			wayPoint += "insert into waypoints select a.count, ST_SetSRID(ST_Point(";
			wayPoint += locations[location];
			wayPoint += "),4326) from (select max(gid)+" + index;
			wayPoint += " as count from public.green_spaces) as a;";
			index++;
		}
		return wayPoint;
	}
};

module.exports = queryBuilder;