CREATE DATABASE IF NOT EXISTS credit_io;
USE credit_io;

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	user_id 	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    full_name  VARCHAR(50)  NOT NULL,
    user_name   VARCHAR(50)  NOT NULL,
    password    VARCHAR(255) NOT NULL,
    email 	 	VARCHAR(255) NOT NULL,
    status      VARCHAR(10)   NOT NULL DEFAULT "Logged In"
);

CREATE TABLE customers
(
	customer_id  SMALLINT PRIMARY KEY AUTO_INCREMENT,
	user_id 	 SMALLINT NOT NULL,
    full_name   VARCHAR(50)  NOT NULL, 
    address 	 VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50)  NOT NULL,
    image_uri	 VARCHAR(255) NOT NULL,
	FOREIGN KEY fk_customers_users (user_id)
		REFERENCES users (user_id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

CREATE TABLE payments
(
	payment_id   	  	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    amount  	  	  	DECIMAL(9,2)   NOT NULL,
    payment_date_time   DATETIME 	   NOT NULL,
    payment_type	  	VARCHAR(10)    NOT NULL,
    customer_id 	  	SMALLINT 	   NOT NULL,
    user_id			  	SMALLINT 	   NOT NULL,
    FOREIGN KEY fk_payments_customers (customer_id)
		REFERENCES customers (customer_id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
	FOREIGN KEY fk_payments_customers1 (user_id)
		REFERENCES customers (user_id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);













