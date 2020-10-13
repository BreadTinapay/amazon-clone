import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnb2UMYqIVD2DTBkWiloYdrHIV7TwjQU4",
    authDomain: "clone-c221c.firebaseapp.com",
    databaseURL: "https://clone-c221c.firebaseio.com",
    projectId: "clone-c221c",
    storageBucket: "clone-c221c.appspot.com",
    messagingSenderId: "467919261562",
    appId: "1:467919261562:web:c16f25515185a171af50c3",
    measurementId: "G-3C4XE8QNHG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth };