import firebase from "firebase/app";import "firebase/firestore";
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;