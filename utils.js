const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require('firebase/database');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');
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

function push(timeToFailure1, timeToFailure2) {
  const db = getDatabase();
  const sootblower = parseInt(timeToFailure1);
  const boiler = parseInt(timeToFailure2);
  set(ref(db, 'next_maintenance/'), {
    sootblower, boiler
  });
}

async function pushFirestore1(value1, timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'vibrations_1_minutes');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    vibration: value1,
    timestamp: timestamp
  });
}

async function pushFirestore2(value2, timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'vibrations_2_minutes');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    vibration: value2,
    timestamp: timestamp
  });
}

async function pushReports1(value1, timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'reports');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    engine: "Sootblower",
    vibration: value1,
    timestamp: timestamp
  });
}

async function pushReports2(value2, timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'reports');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    engine: "Boiler",
    vibration: value2,
    timestamp: timestamp
  });
}

function getDateOnly(dateTimeString) {
  const dateArray = dateTimeString.split(', ')[0].split('/');
  const day = dateArray[0];
  const month = dateArray[1];
  const year = dateArray[2];

  return `${day}/${month}/${year}`;
}

function getDateOnlyOh(dateTimeString) {
  const dateArray = dateTimeString.split(', ')[0].split('/');
  const day = parseInt(dateArray[0]) + 3;
  const month = dateArray[1];
  const year = dateArray[2];

  return `${day}/${month}/${year}`;
}

async function pushVisMaintenance1(timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'maintenances');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  const date = getDateOnly(timestamp);
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    component: "Sootblower",
    date: date,
    type: "Check-up",
    status: "On request"
  });
}

async function pushVisMaintenance2(timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'maintenances');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  const date = getDateOnly(timestamp);
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    component: "Boiler",
    date: date,
    type: "Check-up",
    status: "On request"
  });
}

async function pushOhMaintenance1(timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'maintenances');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  const date = getDateOnlyOh(timestamp);
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    component: "Sootblower",
    date: date,
    type: "Overhaul",
    status: "On request"
  });
}

async function pushOhMaintenance2(timestamp) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'maintenances');
  const newDocRef = doc(collectionRef); // Automatically generate an incremental id for the new document
  const date = getDateOnlyOh(timestamp);
  await setDoc(newDocRef, { 
    id: newDocRef.id,
    component: "Boiler",
    date: date,
    type: "Overhaul",
    status: "On request"
  });
}

module.exports = { push, pushFirestore1, pushFirestore2, pushReports1, pushReports2, pushVisMaintenance1, pushVisMaintenance2, pushOhMaintenance1, pushOhMaintenance2};