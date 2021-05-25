UPDATE member
SET 
email = $2,
WHERE email = $1
RETURNING *;