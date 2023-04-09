const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const { getAnalytics } = require('firebase/analytics');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaL2m6vcPej-fI7hF7Y1T4LD2SMIwhYMg",
  authDomain: "pln-reksti.firebaseapp.com",
  databaseURL: "https://pln-reksti-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pln-reksti",
  storageBucket: "pln-reksti.appspot.com",
  messagingSenderId: "340226970797",
  appId: "1:340226970797:web:7d45d89e3ca51675b4e224",
  measurementId: "G-QFQ08NSKT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Get a database reference to our blog

function push1(data, timestamp) {
  const db = getDatabase();
  set(ref(db, 'engine1/'), {
    data, timestamp
  });
}

function push2(data, timestamp) {
  const db = getDatabase();
  set(ref(db, 'engine2/'), {
    data, timestamp
  });
}

module.exports = { push1, push2 };