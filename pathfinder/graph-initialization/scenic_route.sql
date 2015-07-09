drop function if exists scenic_route();
create function scenic_route() RETURNS TABLE(path int, route text[]) as $$
BEGIN
	create temporary table if not exists bbox(box box2d) on commit drop;
	insert into bbox
		select ST_Expand(ST_Extent(location),0.03) as box from waypoints;

	create temporary table if not exists b_spaces(
		id int unique 
	) on commit drop;
	RAISE NOTICE 'function is here now';
	insert into b_spaces
		select distinct public.green_spaces.gid from public.green_spaces, bbox 
		where public.green_spaces.location && bbox.box;

	create temporary table if not exists b_graph(
		id serial primary key, 
		source int, 
		target int, 
		cost double precision
	) on commit drop;
	insert into b_graph
		select * from public.green_graph
		where exists(select 1 from b_spaces where id=public.green_graph.source)
		and exists(select 1 from b_spaces where id=public.green_graph.target);

	create temporary table if not exists local_green(
		gid serial primary key, 
		location geometry(Point,4326)
	) on commit drop;
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

	return query
		with 
		results as (
			SELECT seq AS route, id1, id2 AS edge, cost 
			FROM pgr_ksp('SELECT * FROM b_graph', 2356, 2357, 3, false)
		),
		pkg as (
			select results.id1, REPLACE(ST_AsText(local_green.location),'POINT','') as loc 
			from results left join
			local_green on local_green.gid=results.edge 
			where local_green.location is not null
		)
		select id1, array_agg(loc) 
		from pkg
		group by id1;
	return;
END;
$$ LANGUAGE plpgsql;
