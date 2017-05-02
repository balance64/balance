CREATE DATABASE balance;

USE balance;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(30),
  PRIMARY KEY(id),
  UNIQUE(name)
);


INSERT INTO users (id, name) VALUES (1, "GUILLERMO's SHITTY Attitude!");

INSERT INTO users (id, name) VALUES (2, "MICHAEL's SHITTy humor");

INSERT INTO users (id, name) VALUES (3, "Trace's pure awesomness!");