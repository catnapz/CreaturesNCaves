import firebase from "firebase";
import { auth } from "firebaseui"

const firebaseConfig = {
  apiKey: "AIzaSyBNCZ59HJ51Fa4EF5AfN1M0Klg0dp0jXyM",
  authDomain: "creaturesncaves.firebaseapp.com",
  databaseURL: "https://creaturesncaves.firebaseio.com",
  projectId: "creaturesncaves",
  storageBucket: "creaturesncaves.appspot.com",
  messagingSenderId: "961563056714",
  appId: "1:961563056714:web:ef0361fcca28b5a6fda4b3",
  measurementId: "G-QNB7XX9FPH"
};

firebase.initializeApp(firebaseConfig);

export const uiConfig: auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
}

export const firebaseAuth = firebase.auth();

export const signOut = () => firebaseAuth.signOut();