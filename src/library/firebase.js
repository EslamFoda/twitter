// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUzqr_fAv5nvs-jDdLh9jWmSUpBnbf0XE",
  authDomain: "twitter-4u.firebaseapp.com",
  projectId: "twitter-4u",
  storageBucket: "twitter-4u.appspot.com",
  messagingSenderId: "189188986163",
  appId: "1:189188986163:web:0cd67f42ae027882301a46",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const {FieldValue} = firebase.firestore
const auth = firebase.auth()

export { database, timestamp, FieldValue, auth };
