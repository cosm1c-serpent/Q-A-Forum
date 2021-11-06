import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDn8gS_xsdVleWioaij2fdb6J-JpjdDsRY",
    authDomain: "online-forum-731a1.firebaseapp.com",
    projectId: "online-forum-731a1",
    storageBucket: "online-forum-731a1.appspot.com",
    messagingSenderId: "206743112672",
    appId: "1:206743112672:web:ce94f0b7ef482bc4d43985",
    measurementId: "G-FER521W9M0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();
  
  export { auth, provider };
  export default db;