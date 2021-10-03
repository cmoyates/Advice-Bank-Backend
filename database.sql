CREATE DATABASE advicebank;

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    user_name TEXT NOT NULL,
    user_img TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT [],
    ts TIMESTAMP NOT NULL
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_img TEXT NOT NULL,
    user_privilege INT NOT NULL,
    saved INT []
);