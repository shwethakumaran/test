import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDl-wjfzN_PV2uTfVEh6IyAeiUaGIEROZY",
  authDomain: "myproject-e53af.firebaseapp.com",
  projectId: "myproject-e53af",
  storageBucket: "myproject-e53af.appspot.com",
  messagingSenderId: "1059574938949",
  appId: "1:1059574938949:web:dc83acab9773bfbb86922c",
  measurementId: "G-PYEHLDMCMG",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
