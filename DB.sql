CREATE DATABASE loginDB;

USE loginDB:
  
CREATE TABLE logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logins (username, password) VALUES ('aaa', 'aaa');