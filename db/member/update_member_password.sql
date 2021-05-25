UPDATE member
SET
hash = $2,
WHERE member_id = $1
RETURNING *;