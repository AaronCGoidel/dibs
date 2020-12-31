import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB4g-qMi-9nf0e8W6j2-PPl3as7tzg_ulM",
  authDomain: "dibs-40014.firebaseapp.com",
  projectId: "dibs-40014",
  storageBucket: "dibs-40014.appspot.com",
  messagingSenderId: "198893246085",
  appId: "1:198893246085:web:9efd761c8d7481f1947bec",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
