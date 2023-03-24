function createCreateSchemaQuery() {
  const query = `

  DROP TABLE IF EXISTS payments;
  DROP TABLE IF EXISTS customers;
  DROP TABLE IF EXISTS users;

  CREATE TABLE IF NOT EXISTS users
  (
      user_id 	INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name   VARCHAR(50)  NOT NULL,
      user_name   VARCHAR(50)  NOT NULL,
      password    VARCHAR(255) NOT NULL,
      email 	 	  VARCHAR(255) NOT NULL,
      status      VARCHAR(10)   NOT NULL DEFAULT "Logged In"
  );

  CREATE TABLE IF NOT EXISTS customers
  (
      customer_id  INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id 	 INTEGER NOT NULL,
      full_name    VARCHAR(50)  NOT NULL, 
      address 	 VARCHAR(255) NOT NULL,
      phone_number VARCHAR(50)  NOT NULL,
      image_uri	 VARCHAR(255) NOT NULL,
      FOREIGN KEY fk_customers_users (user_id)
          REFERENCES users (user_id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION
  );

  CREATE TABLE IF NOT EXISTS payments
  (
      payment_id   	  	INTEGER PRIMARY KEY AUTOINCREMENT,
      amount  	  	  	DECIMAL(9,2)   NOT NULL,
      payment_date_time   TEXT 	   NOT NULL,
      payment_type	  	VARCHAR(10)    NOT NULL,
      customer_id 	  	INTEGER 	   NOT NULL,
      user_id			  	INTEGER 	   NOT NULL,
      FOREIGN KEY fk_payments_customers (customer_id)
          REFERENCES customers (customer_id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION,
      FOREIGN KEY (user_id)
          REFERENCES customers (user_id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION
  );
    
    `;
  return query;
}

function createTableUsersQuery() {
  const query = `
  CREATE TABLE IF NOT EXISTS users
  (
      user_id 	  INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name   TEXT  NOT NULL,
      user_name   TEXT  NOT NULL,
      password    TEXT  NOT NULL,
      email 	 	  TEXT  NOT NULL,
      status      TEXT  NOT NULL DEFAULT "Logged In"
  )
      `;
  return query;
}

function createAddUserQuery() {
  const query = `
            INSERT INTO users VALUES
            (
                DEFAULT,
                ?,
                ?,
                ?,
                ?,
                DEFAULT
            );
        `;
  return query;
}

function createMakePaymentQuery(
  paymentDate,
  paymentType,
  userId,
  customerId,
  amount
) {
  const query = `
        INSERT INTO payments VALUES 
        (
            DEFAULT,
            ${amount},
            ${paymentDate},
            "${paymentType}",
            ${customerId},
            ${userId}
        );
    
    `;
  return query;
}

function createGetCustomerIdQuery(fullName, phoneNumber) {
  const query = `SELECT customer_id FROM customers 
  WHERE full_name="${fullName}" AND phone_number="${phoneNumber}";`;
  return query;
}

export default {
  createCreateSchemaQuery,
  createAddUserQuery,
  createGetCustomerIdQuery,
  createMakePaymentQuery,
  createTableUsersQuery,
};
