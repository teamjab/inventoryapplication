DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name CHAR(10),
    username VARCHAR(10),
    password VARCHAR(255)
);
    