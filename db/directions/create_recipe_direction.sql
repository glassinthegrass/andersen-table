INSERT INTO directions(recipe_id,step)
VALUES($1,$2)
returning *;

SELECT * FROM directions
where recipe_id = $1;