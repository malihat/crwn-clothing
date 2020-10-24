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

// userAuth is an object that we get from auth library (with all info. when user signs in)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  // we will query inside the firestore, to save the user's id in the db
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
} 

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
}  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google auth 
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})  //google popup for signin
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
