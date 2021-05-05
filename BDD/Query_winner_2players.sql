UPDATE ref_matches_players
SET position = 1
WHERE id IN
	(select a.id from
		(SELECT temp.id, MAX(step) FROM steps as s
		INNER JOIN
			(SELECT `name`,r.id,idMatch,idPlayer,position FROM matches AS m
			INNER JOIN ref_matches_players AS r
			ON m.id=r.idMatch) as temp
		ON s.idMatchPlayer=temp.id
		GROUP BY temp.idMatch) as a);

commit;


UPDATE ref_matches_players
SET position = 2
WHERE id NOT IN
	(select a.id from
		(SELECT temp.id,MAX(step) FROM steps as s
		INNER JOIN
			(SELECT `name`,r.id,idMatch,idPlayer,position FROM matches AS m
			INNER JOIN ref_matches_players AS r
			ON m.id=r.idMatch) as temp
		ON s.idMatchPlayer=temp.id
		GROUP BY temp.idMatch) as a)
        ;
