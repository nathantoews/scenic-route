-- Generting our waypoints table. Assume that this first chunk will be inserted dynamically.
SET search_path to pg_temp, public;

drop table if exists waypoints;
create table waypoints(
	gid serial primary key, 
	location geometry(Point,4326) 
);
insert into waypoints
	select a.count, ST_SetSRID(ST_Point(-79.380658, 43.645388),4326) 
	from (select max(gid)+1 as count from public.green_spaces)
	as a;
insert into waypoints
	select a.count, ST_SetSRID(ST_Point( -79.391974, 43.647957),4326)
	from (select max(gid)+2 as count from public.green_spaces) 
	as a;

-- Generating our b_spaces and b_graph
drop table if exists bbox;
create table bbox(box box2d);
insert into bbox
	select ST_Expand(ST_Extent(location),0.03) as box from waypoints;

drop table if exists b_spaces;
create table b_spaces(
	id int unique 
);

insert into b_spaces
	select distinct public.green_spaces.gid from public.green_spaces, bbox 
	where public.green_spaces.location && bbox.box;

drop table if exists b_graph cascade;
create table b_graph(
	id serial primary key, 
	source int, 
	target int, 
	cost double precision
);

insert into b_graph
	select * from public.green_graph
	where exists(select 1 from b_spaces where id=public.green_graph.source)
	and exists(select 1 from b_spaces where id=public.green_graph.target);

-- Creating portion of the graph we will augment with b_graph.
drop table if exists local_green;
create table local_green(
	gid serial primary key, 
	location geometry(Point,4326)
);
insert into local_green 
	select gid, location 
	from public.green_spaces 
	where exists(select 1 from b_spaces where b_spaces.id=public.green_spaces.gid);

with aug_temp as (
	select a1.gid as source, a2.gid as target, ST_Distance(a1.location, a2.location, true) as cost
	from local_green as a1, waypoints as a2
	where a1.gid!=a2.gid
	and ST_Distance(a1.location, a2.location, true)>0
)
insert into b_graph(source, target, cost) (
	(select source, target, cost from aug_temp) 
	UNION 
	(select target as source, source as target, cost from aug_temp)
);

with 
results as (
	SELECT seq AS route, id1 AS node, id2 AS edge, cost 
	FROM pgr_ksp('SELECT * FROM b_graph', 2356, 2357, 3, false)
),
pkg as (
	select results.node, REPLACE(ST_AsText(local_green.location),'POINT','') as xy 
	from results left join
	local_green on local_green.gid=results.edge 
	where local_green.location is not null
)
select node, array_agg(xy) 
from pkg
group by node;
