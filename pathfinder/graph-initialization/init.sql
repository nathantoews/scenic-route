
create extension if not exists postgis;
create extension if not exists pgrouting;

drop table if exists green_spaces cascade;
create table green_spaces(
	gid serial primary key, 
	name varchar, 
	location geometry(Point,4326) 
);

drop table if exists t cascade;
create temporary table t(
	name varchar, 
	long double precision, 
	lat double precision
);
COPY t FROM '/var/lib/postgresql/parkCoords.csv' HEADER 
	DELIMITER ',' CSV;

insert into green_spaces(name, location)
	select name, ST_SetSRID(ST_Point(long, lat),4326) from t;

drop table if exists green_graph cascade;
create table green_graph(
	id serial primary key, 
	source int, 
	target int, 
	cost double precision
);

insert into green_graph(source,target,cost)
	select a1.gid, a2.gid, ST_Distance(a1.location,a2.location, true)
	from green_spaces as a1, green_spaces as a2 
	where a1.gid!=a2.gid
	and ST_Distance(a1.location,a2.location, true) > 0;

-- drop view if exists paths;
-- create view paths as
	-- SELECT seq AS route, id1 AS node, id2 AS edge, cost 
	-- FROM pgr_ksp('SELECT * FROM green_graph', 1, 2, 1, false);
