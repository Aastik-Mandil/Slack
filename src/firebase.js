import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCGoeXBXX46nokdSgYZfPXYsIiUvrWcbvw",
    authDomain: "slack-fd264.firebaseapp.com",
    projectId: "slack-fd264",
    storageBucket: "slack-fd264.appspot.com",
    messagingSenderId: "985421614142",
    appId: "1:985421614142:web:f3a438567449ba57f2956f",
    measurementId: "G-ZTW9YBLW2W"
};
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;