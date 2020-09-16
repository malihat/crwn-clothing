import firebase from 'firebase/app';   //importing firebase utility library
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA9FluxHC9OoyxnqHP7pqjVHx846GMDfGY",
  authDomain: "crwn-db-99ea2.firebaseapp.com",
  databaseURL: "https://crwn-db-99ea2.firebaseio.com",
  projectId: "crwn-db-99ea2",
  storageBucket: "crwn-db-99ea2.appspot.com",
  messagingSenderId: "757411610050",
  appId: "1:757411610050:web:f2cdba04047477d4a4aa5b",
  measurementId: "G-EZ6JX9S4Z2"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google auth 
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})  //google popup for signin
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
