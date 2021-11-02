// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
require("firebase/firestore");
require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhAY_YQgdsvRuqM0pt0ynNlkrP5Vv7ebo",
  authDomain: "buy-sell-365.firebaseapp.com",
  projectId: "buy-sell-365",
  storageBucket: "buy-sell-365.appspot.com",
  messagingSenderId: "963075954379",
  appId: "1:963075954379:web:660066b82d969376d06d4e",
  measurementId: "G-T7TC0CWQYK"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const store = firebase.firestore();

export { auth, store };