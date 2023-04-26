// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJs5IwTVGlb-y15Q19hTvjq5XCdVZ-iqs",
  authDomain: "credit-io.firebaseapp.com",
  projectId: "credit-io",
  storageBucket: "credit-io.appspot.com",
  messagingSenderId: "3354402696",
  appId: "1:3354402696:web:dc797cda2a6f5c60e8643d",
  measurementId: "G-0EMZDJ2DMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export {
  app,
  firebaseConfig
}