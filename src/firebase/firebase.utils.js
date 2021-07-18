import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgrTvca7JyzUjKd8opjhLnPbkFMdWFJ-k",
    authDomain: "crwn-db-a0f29.firebaseapp.com",
    projectId: "crwn-db-a0f29",
    storageBucket: "crwn-db-a0f29.appspot.com",
    messagingSenderId: "619084301312",
    appId: "1:619084301312:web:9f85382052def6ab9804e5",
    measurementId: "G-1ZRVNRQH8R"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


