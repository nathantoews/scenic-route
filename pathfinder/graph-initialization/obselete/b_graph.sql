
drop table if exists bbox;
create table bbox(box box2d);
insert into bbox
	select ST_Expand(ST_Extent(location),0.02) as box from green_spaces
	where name like 'UNION STATION'
	or name like 'CRITICAL MASS';

-- >30 ms 

drop table if exists b_spaces;
create table b_spaces(
	id int unique 
);

insert into b_spaces
	select distinct green_spaces.gid from green_spaces, bbox 
	where green_spaces.location && bbox.box;

-- >50 ms

drop table if exists b_graph cascade;
create table b_graph(
	id serial primary key, 
	source int, 
	target int, 
	cost double precision
);

insert into b_graph
	select * from green_graph
	where exists(select 1 from b_spaces where id=green_graph.source)
	and exists(select 1 from b_spaces where id=green_graph.target);


-- 2s on RAM Disk / 5s on regular disk
	
drop view if exists results;
create view results as 
SELECT seq AS route, id1 AS node, id2 AS edge, cost 
FROM pgr_ksp('SELECT * FROM b_graph', 2654, 2655, 5, false);

-- 5.6 seconds! BRRRAPP BRAAAP

select node, array_agg(edge) from results 
where node> 0 
group by node 
order by node asc;
