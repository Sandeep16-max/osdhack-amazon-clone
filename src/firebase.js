import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPlKlncnh2AZc7wYOnzkPRtcbkosUwwoM",
  authDomain: "clone-2b667.firebaseapp.com",
  projectId: "clone-2b667",
  storageBucket: "clone-2b667.appspot.com",
  messagingSenderId: "953095698701",
  appId: "1:953095698701:web:96d4b8e82d1241a426d844"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth}