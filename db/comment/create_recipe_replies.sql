INSERT INTO replies(comment,picture,replied_comment_id,member_id)
VALUES($1,$2,$3,$4)
returning *;