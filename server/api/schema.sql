DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS notes;


CREATE TABLE user(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL	
);

CREATE TABLE notes(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	body TEXT ,
	user INTEGER NOT NULL,
	FOREIGN KEY (user) REFERENCES user (id)	
);