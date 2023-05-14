//Actual sql work will be done here
import * as SQLite from "expo-sqlite";
import Query from "../Database/SqlQueries";
import { compare } from "../auth/encryption";

const DATABASE_NAME = "credit_io";

const db = SQLite.openDatabase(DATABASE_NAME, "1", null, null, () =>
  console.log("Database Selected")
);

function getPayments(customer_id, user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM payments
        WHERE customer_id = ? AND user_id = ? AND deleted = "no"`,
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
        WHERE user_id = ? AND deleted = "no"`,
        [user_id],
        (txObj, success) => resolve(success.rows._array),
        (txObj, error) => reject(error)
      );
    });
  });
}

function createDatabaseSchema() {
  enableForeignKeySupport();
  // dropTable("users");
  // dropTable("payments");
  // dropTable("customers");
  // dropTable("interest");
  createTableUsers();
  createTableCustomers();
  createTablePayments();
  createTableInterest();
}

function createTableUsers() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS users
      (
          user_id 	INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name   VARCHAR(50),
          email       VARCHAR(50)  NOT NULL,
          password    VARCHAR(255) NOT NULL,
          phone_number VARCHAR(50) NOT NULL,
          country     VARCHAR(20)  NOT NULL,
          status      VARCHAR(10)  NOT NULL DEFAULT "Logged In"
      );
      `,
      null,
      (txObj, resultSet) => console.log("success in creating users table"),
      () => console.log("error in creating users table")
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
        deleted       VARCHAR(5)   DEFAULT "no",
        deleted_date  TEXT,
        deleted_date_time  TEXT,
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

function createTableInterest() {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS interest
      (
        interest_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id 	    INTEGER NOT NULL,
        user_id        INTEGER NOT NULL,
        interestable_amount DECIMAL(9,2)   NOT NULL,
        interest_rate       INTEGER   NOT NULL,
        interest_updated_date TEXT,
        deleted       VARCHAR(5)   DEFAULT "no",
        deleted_date  TEXT,
        deleted_date_time  TEXT,
        CONSTRAINT fk_customers1
          FOREIGN KEY (customer_id)
          REFERENCES customers (customer_id)
      );`,
      null,
      (txObj, resultSet) => console.log("success in creating interest table"),
      () => console.log("error in creating interest table")
    );
  });
}

function updateInterest({customer_id, interestable_amount, interest_updated_date}){
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE interest SET interestable_amount = interestable_amount+?, interest_updated_date=?
          WHERE customer_id=?`,
         [interestable_amount, interest_updated_date, customer_id],
         (txObj, success) =>
              resolve({ interestAdded: true, success: success }),
         (txObj, error) => reject(error)
      )
    });
  });
}

function getAllInterest(user_id){
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM interest WHERE user_id = ?`,
         [user_id],
         (txObj, success) =>
              resolve(success.rows._array),
         (txObj, error) => reject(error)
      )
    });
  });
}

function getInterest(customer_id){
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM interest WHERE customer_id = ?`,
         [customer_id],
         (txObj, success) =>
              resolve(success.rows._array),
         (txObj, error) => reject(error)
      )
    });
  });
}

function addInterest({customer_id, user_id, interestable_amount, interest_rate}){
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO interest (customer_id, user_id, interestable_amount, interest_rate)
         VALUES (?,?,?,?)`,
         [customer_id,user_id, interestable_amount, interest_rate],
         (txObj, success) =>
              resolve({ interestAdded: true, success: success }),
         (txObj, error) => reject(error)
      )
    });
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
      payment_date        TEXT     NOT NULL,
      payment_type	  	  VARCHAR(10)    NOT NULL,
      payment_note        VARCHAR(200),
      deleted       VARCHAR(3)   DEFAULT "no",
      deleted_date_time  TEXT,
      deleted_date       TEXT,
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
      payment_date_time   TEXT 	       NOT NULL,
      payment_type	  	VARCHAR(10)    NOT NULL,
      payment_note      VARCHAR(200),
      deleted       VARCHAR(3)   DEFAULT "no",
      deleted_date_time  TEXT,
      customer_id 	  	INTEGER 	     NOT NULL,
      user_id			  	INTEGER 	       NOT NULL,
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

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO customers 
          (user_id,full_name,address,phone_number,image_uri) 
          VALUES (?,?,?,?,?)`,
          [
            user.user_id,
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
}

function getAllCustomers(user) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM customers
        WHERE user_id = ? AND deleted = "no"`,
        [user.user_id],
        (txObj, success) => resolve(success.rows._array),
        (txObj, error) => reject(error)
      );
    });
  });
}

function checkisUserExists(phone_number) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE phone_number = ?",
        [phone_number],
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
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE phone_number = ?",
        [user.phone_number],
        (txObj, success) => {
          if (success.rows._array.length !== 0) {
            resolve({
              user: success.rows._array,
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
        console.log("PASSING TO COM ",user.password+" "+result.user[0].password);
        const comparison = compare(user.password, result.user[0].password);

        if(!comparison) return false; 
      
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE users SET status = "Logged In" WHERE user_id = ?`,
            [result.user[0].user_id]
          );
        });
      } else return false;

    } catch (error) {
      console.log("ERROR IN LOGIN SQLITE", error);
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
        "INSERT INTO users (user_name,email,password,phone_number,country) VALUES (?,?,?,?,?)",
        ["", user.email, user.password, user.phone_number, user.country],
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
              "INSERT INTO payments (amount, payment_date_time, payment_date, payment_type, payment_note, customer_id, user_id) VALUES (?,?,?,?,?,?,?)",
              [payment.amount, payment.payment_date_time.toString(), payment.payment_date.toString(), payment.payment_type, payment.payment_note, payment.customer_id, payment.user_id],
              (txObj, result) => console.log("Successful" + result),
              (txObj, result) => console.log("Error" + result)
            );

          },
          (err) => reject(err),
          (success) => resolve(success)
          )
    });
  };

  function getRecentPayments (user_id) {
   
    return new Promise(async(resolve, reject) => {
      const payments = await getAllPayments(user_id);
      const recentPayments = [];
      for(let payment of payments){
          recentPayments[payment.customer_id] = {...payment};
      }

      resolve(recentPayments);
    });
  }

  function deleteCustomer(customer){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE customers SET deleted = "yes", deleted_date_time = ?, deleted_date = ? WHERE customer_id=?;`,
            [customer.deleted_date_time, customer.deleted_date, customer.customer_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )

          tx.executeSql(
            `UPDATE payments SET deleted = 'yes', deleted_date_time = ?, deleted_date = ? WHERE customer_id = ?;`,
            [customer.deleted_date_time, customer.deleted_date, customer.customer_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  //ALSO NEED TO RESTORE THE PAYMENTS FOR THE CUSTOMERS
  function restoreCustomers(restoreDate, today){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE customers SET deleted = "no", deleted_date_time = "" WHERE deleted_date BETWEEN ? AND ?;`,
            [restoreDate, today],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function deletePayment(payment){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE payments SET deleted = 'yes', deleted_date_time = ?, deleted_date = ? WHERE payment_id = ?;`,
            [payment.deleted_date_time, payment.deleted_date, payment.payment_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function restorePayments(restoreDate, today){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE payments SET deleted = 'no', deleted_date_time = '' WHERE deleted_date BETWEEN ? AND ?;`,
            [restoreDate, today],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function updateCustomer(customer) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE customers SET full_name=?, phone_number=?, address=?, image_uri=? WHERE customer_id=?`,
            [customer.full_name, customer.phone_number, customer.address, customer.image_uri, customer.customer_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function getPaymentsByDate(user_id, date){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT p.payment_id, 
                    c.full_name, 
                    p.amount,
                    p.payment_date, 
                    p.payment_date_time, 
                    p.payment_type
              FROM payments p 
              JOIN customers c 
                ON p.customer_id = c.customer_id
              WHERE p.user_id = ? AND p.payment_date = ? AND p.deleted = 'no'`,
            [user_id, date],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function removeAccount(user_id){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM users WHERE user_id = ?`,
            [user_id],
            (txObj, result) => resolve(result.rows._array),
            (txObj, result) => reject(result)
          )
        }
      )
    });
  }

  function updatePayment(payment){
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE payments SET amount=?, payment_note=? WHERE payment_id=?`,
            [payment.amount, payment.payment_note, payment.payment_id],
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
  deleteCustomer,
  deletePayment,
  restoreCustomers,
  restorePayments,
  updateCustomer,
  getPaymentsByDate,
  removeAccount,
  updatePayment,
  addInterest,
  getAllInterest,
  updateInterest,
  getInterest,
};
