INSERT INTO ingredients(recipe_id,ingredient)
VALUES($1,$2)
returning *;

SELECT * FROM ingredients
where recipe_id = $1;