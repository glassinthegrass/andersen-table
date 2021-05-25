INSERT INTO member(email,hash,name)
VALUES($1,$2,$3)
returning *;