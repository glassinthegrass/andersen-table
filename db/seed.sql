DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS directions;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS member;

CREATE TABLE member(
    member_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    hash VARCHAR(100) NOT NULL,
    icon TEXT DEFAULT 'https://i.imgur.com/6XaGJwG.jpg',
    name VARCHAR(100)
);

CREATE TABLE recipes(
recipe_id SERIAL PRIMARY KEY,
name varchar(255),
photo text,
member_id INT,
FOREIGN KEY(member_id) REFERENCES member(member_id)
 );

CREATE TABLE directions(
    direction_id SERIAL PRIMARY KEY,
   recipe_id INT,
   FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id),
   step VARCHAR(255)
 );

CREATE TABLE ingredients(
    ingredient_id SERIAL PRIMARY KEY,
       recipe_id INT,
   FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id),
ingredient VARCHAR(255)
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    comment VARCHAR(500),
    picture text,
    recipe_id INT,
    FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id),
    member_id INT,
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);

CREATE TABLE replies(
    reply_id SERIAL PRIMARY KEY,
    comment VARCHAR(500),
    picture text,
    replied_comment_id INT,
    FOREIGN KEY(replied_comment_id) REFERENCES comments(comment_id),
    member_id INT,
    FOREIGN KEY(member_id) REFERENCES member(member_id)
);