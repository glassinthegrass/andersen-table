INSERT INTO comments(comment,picture,recipe_id,member_id)
VALUES($1,$2,$3,$4)
returning *;