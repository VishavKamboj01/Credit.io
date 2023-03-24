//Actual sql work will be done here
import * as SQLite from "expo-sqlite";
import Query from "../Database/SqlQueries";

const DATABASE_NAME = "credit_io";

const db = SQLite.openDatabase(DATABASE_NAME, "1", null, null, () =>
  console.log("Database Selected")
);

function getPayments(customer_id, user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM payments
        WHERE customer_id = ? AND user_id = ?`,
        [customer_id, user_id],
        (txObj, success) => resolve(success.rows._array),
        (txObj, error) => reject(error)
      );
    });
  });
}

function getAllPayments(user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM payments
        WHERE user_id = ?`,
        [user_id],
        (txObj, success) => resolve(success.rows._array),
        (txObj, error) => reject(error)
      );
    });
  });
}

function createDatabaseSchema() {
  enableForeignKeySupport();
  dropTable("users");
  dropTable("payments");
  dropTable("customers");
  dropTable("recent_payments");
  createTableUsers();
  createTableCustomers();
  createTablePayments();
  createTableRecentPayments();
}

function createTableUsers() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS users
      (
          user_id 	INTEGER PRIMARY KEY AUTOINCREMENT,
          full_name   VARCHAR(50)  NOT NULL,
          user_name   VARCHAR(50)  NOT NULL,
          password    VARCHAR(255) NOT NULL,
          email 	 	VARCHAR(255) NOT NULL,
          status      VARCHAR(10)   NOT NULL DEFAULT "Logged In"
      );
      `,
      null,
      (txObj, resultSet) => console.log("success in creating users table"),
      () => console.log("error in creating table")
    );
  });
}

function createTableCustomers() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS customers
      (
        customer_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id 	    INTEGER NOT NULL,
        full_name     VARCHAR(50)  NOT NULL, 
        address 	    VARCHAR(255) NOT NULL,
        phone_number  VARCHAR(50)  NOT NULL,
        image_uri	    VARCHAR(255) NOT NULL,
        CONSTRAINT fk_users
          FOREIGN KEY (user_id)
          REFERENCES users (user_id)
      );`,
      null,
      (txObj, resultSet) => console.log("success in creating customers table"),
      () => console.log("error in creating customers table")
    );
  });
}

function createTablePayments() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS payments (
      payment_id   	  	  INTEGER PRIMARY KEY AUTOINCREMENT,
      amount  	  	  	  DECIMAL(9,2)   NOT NULL,
      payment_date_time   TEXT 	   NOT NULL,
      payment_type	  	  VARCHAR(10)    NOT NULL,
      customer_id 	  	  INTEGER 	   NOT NULL,
      user_id			  	    INTEGER 	   NOT NULL,
      CONSTRAINT fk_customers
        FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
      CONSTRAINT fk_customers1
        FOREIGN KEY (user_id)
        REFERENCES customers (user_id)
      );`,
      null,
      (txObj, resultSet) => console.log("success in creating payments table"),
      () => console.log("error in creating payments table")
    );
  });
}

function createTableRecentPayments() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS recent_payments
  (
      payment_id   	  	INTEGER PRIMARY KEY AUTOINCREMENT,
      amount  	  	  	DECIMAL(9,2)   NOT NULL,
      payment_date_time   TEXT 	   NOT NULL,
      payment_type	  	VARCHAR(10)    NOT NULL,
      customer_id 	  	INTEGER 	   NOT NULL,
      user_id			  	INTEGER 	   NOT NULL,
      FOREIGN KEY (customer_id)
          REFERENCES customers (customer_id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION,
      FOREIGN KEY (user_id)
          REFERENCES customers (user_id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION
  );`,
      null,
      (txObj, resultSet) => console.log("success in creating recent_payments table"),
      () => console.log("error in creating recent_payments table")
    );
  });
}

function enableForeignKeySupport() {
  db.transaction((tx) => {
    tx.executeSql("PRAGMA foriegn_keys = ON;", null, () =>
      console.log("Foreign Key Support Enabled")
    );
  });
}

function createCustomer(user, customer) {
  const fetchUserId = async () => {
    const userId = await getUserId(user.user_name);
    if (userId === 0) return null;
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO customers 
          (user_id,full_name,address,phone_number,image_uri) 
          VALUES (?,?,?,?,?)`,
          [
            userId,
            customer.full_name,
            customer.address,
            customer.phone_number,
            customer.image_uri,
          ],
          (txObj, success) =>
            resolve({ customerAdded: true, success: success }),
          (txObj, error) => reject(error)
        );
      });
    });
  };
  return fetchUserId();
}

function getAllCustomers(user) {
  const fetchUserId = async () => {
    const userId = await getUserId(user.user_name);
    if (userId === 0) return null;
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM customers
          WHERE user_id = ?`,
          [userId],
          (txObj, success) => resolve(success.rows._array),
          (txObj, error) => reject(error)
        );
      });
    });
  };
  return fetchUserId();
}

function checkisUserExists(user_name) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE user_name = ?",
        [user_name],
        (txObj, success) => {
          if (success.rows._array.length !== 0) resolve({ userExists: true });
          else resolve({ userExists: false });
        },
        (txObj, error) => console.log(error)
      );
    });
  });
}

function isUserExists(user) {
  const userNameOrEmail = user.user_name.includes("@") ? "email" : "user_name";
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE " +
          userNameOrEmail +
          " = ? AND password = ?",
        [user.user_name, user.password],
        (txObj, success) => {
          if (success.rows._array.length !== 0) {
            resolve({
              user_id: success.rows._array[0].user_id,
              userExists: true,
              success: success,
            });
          } else resolve({ userExists: false });
        },
        (txObj, error) => reject(error)
      );
    });
  });
}

function loginUser(user) {
  const check = async () => {
    try {
      const result = await isUserExists(user);

      const { userExists } = result;
      if (userExists) {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE users SET status = "Logged In" WHERE user_id = ?`,
            [result.user_id]
          );
        });
      } else return false;
    } catch (error) {
      console.log(error);
    }
    return true;
  };
  return check();
}

function getUserId(user_name) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT user_id FROM users WHERE user_name = ?",
        [user_name],
        (txObj, success) => {
          if (success.rows._array.length !== 0)
            resolve(success.rows._array[0].user_id);
          else resolve(0);
        },
        (txObj, error) => reject(error)
      );
    });
  });
}

function logoutUser(currentUser) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE users SET status = 'Logged Out' WHERE user_id = ?;",
      [currentUser.user_id],
      (txObj, result) => console.log("Logged Out " + currentUser.user_name),
      (txObj, error) => console.log(error)
    );
  });
}

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE status = 'Logged In'",
        null,
        (txObj, { rows }) => {
          resolve(rows._array[0]);
        },
        (txObj, error) => reject(error)
      );
    });
  });
}

function dropTable(tableName) {
  db.transaction(
    (tx) => {
      tx.executeSql("DROP TABLE IF EXISTS " + tableName);
    },
    null,
    () => console.log("Successfully dropped table " + tableName)
  );
}

function addUser(user) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO users (full_name,user_name,password,email) VALUES (?,?,?,?)",
        [user.full_name, user.user_name, user.password, user.email],
        (txObj, result) => console.log("Successful" + result),
        (txObj, result) => console.log("Error" + result)
      );
    },
    () => console.log("error occored"),
    (success) => console.log("transaction successfull" + success)
  );
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        null,
        (txObj, result) => {
          const { rows } = result;
          resolve(rows._array);
        },
        (txObj, error) => reject(error)
      );
    });
  });
}

function addPayment(payment) {
    
    return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "INSERT INTO payments (amount, payment_date_time, payment_type, customer_id, user_id) VALUES (?,?,?,?,?)",
              [payment.amount, payment.payment_date_time.toString(), payment.payment_type, payment.customer_id, payment.user_id],
              (txObj, result) => console.log("Successful" + result),
              (txObj, result) => console.log("Error" + result)
            );

            tx.executeSql(
              "DELETE FROM recent_payments WHERE customer_id=? AND user_id=?",
              [payment.customer_id, payment.user_id],
              (txObj, result) => console.log("Successful" + result),
              (txObj, result) => console.log("Error" + result)
            );

            tx.executeSql(
              "INSERT INTO recent_payments (amount, payment_date_time, payment_type, customer_id, user_id) VALUES (?,?,?,?,?)",
              [payment.amount, payment.payment_date_time.toString(), payment.payment_type, payment.customer_id, payment.user_id],
              (txObj, result) => console.log("Successful" + result),
              (txObj, result) => console.log("Error" + result)
            );

          },
          (err) => reject(err),
          (success) => resolve(success)
          )
    });
  };

  function getRecentPayments(user_id) {
    console.log("User id ",user_id);
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM recent_payments WHERE user_id=?",
            [user_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }


export default {
  addUser,
  createTableUsers,
  createDatabaseSchema,
  checkisUserExists,
  createCustomer,
  getPayments,
  getAllPayments,
  getAllCustomers,
  getRecentPayments,
  getAllUsers,
  getCurrentUser,
  isUserExists,
  logoutUser,
  loginUser,
  addPayment,
};
