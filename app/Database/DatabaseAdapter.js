import SQlite from "../Database/SQlite";
import Utility from "../UtilityFunctions/Utility";

function getPayments(customer_id, user_id) {
  return SQlite.getPayments(customer_id, user_id);
  // return convertDatesSqlToJs(payments);
}

function createTableUsers() {
  SQlite.createTableUsers();
}

function addUser(user) {
  SQlite.addUser(user);
}

function isUserExists(user) {
  return SQlite.isUserExists(user);
}

function checkIsUserExists(phone_number) {
  return SQlite.checkisUserExists(phone_number);
}

function getAllUsers() {
  return SQlite.getAllUsers();
}

function createDatabaseSchema() {
  SQlite.createDatabaseSchema();
}

function getCurrentUser() {
  return SQlite.getCurrentUser();
}

function convertDatesSqlToJs(payments) {
  payments.forEach((payment) => {
    payment.date = Utility.sqlToJsDate(payment.date);
  });
  return payments;
}

function logoutUser(currentUser) {
  SQlite.logoutUser(currentUser);
}

function loginUser(user) {
  return SQlite.loginUser(user);
}

function createCustomer(user, customer) {
  return SQlite.createCustomer(user, customer);
}

function getAllCustomers(user) {
  return SQlite.getAllCustomers(user);
}

function addPayment(payment){
  return SQlite.addPayment(payment);
}

function getRecentPayments(user_id){
  return SQlite.getRecentPayments(user_id);
}

function getAllPayments(user_id){
   return SQlite.getAllPayments(user_id);
}

function deleteCustomer(customer){
  return SQlite.deleteCustomer(customer);
}

function restoreCustomers(){
  return SQlite.restoreCustomers();
}

function deletePayment(payment_id) {
  return SQlite.deletePayment(payment_id);
}

function restorePayments(){
  return SQlite.restorePayments();
}

function updateCustomer(customer){
  return SQlite.updateCustomer(customer);
}

function getPaymentsByDate(user_id, date){
  return SQlite.getPaymentsByDate(user_id, date);
}

export default {
  addUser,
  createTableUsers,
  createDatabaseSchema,
  checkIsUserExists,
  createCustomer,
  getPayments,
  getAllPayments,
  getAllUsers,
  getAllCustomers,
  getCurrentUser,
  isUserExists,
  logoutUser,
  loginUser,
  addPayment,
  getRecentPayments,
  deleteCustomer,
  deletePayment,
  restoreCustomers,
  restorePayments,
  updateCustomer,
  getPaymentsByDate,
};
