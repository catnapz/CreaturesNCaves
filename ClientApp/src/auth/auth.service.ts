// docs: https://firebase.google.com/docs/auth/web/manage-users
import firebase from "firebase/app";
import "firebase/auth";

export type User = firebase.User;

class AuthService {
  private readonly firebaseConfig = {
    apiKey: "AIzaSyBNCZ59HJ51Fa4EF5AfN1M0Klg0dp0jXyM",
    authDomain: "creaturesncaves.firebaseapp.com",
    databaseURL: "https://creaturesncaves.firebaseio.com",
    projectId: "creaturesncaves",
    storageBucket: "creaturesncaves.appspot.com",
    messagingSenderId: "961563056714",
    appId: "1:961563056714:web:ef0361fcca28b5a6fda4b3",
    measurementId: "G-QNB7XX9FPH",
  };

  private readonly firebaseAuth: firebase.auth.Auth;

  // private readonly fbAuthProvider: firebase.auth.FacebookAuthProvider;
  private readonly googleAuthProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    if (firebase.apps.length === 0) firebase.initializeApp(this.firebaseConfig);
    this.firebaseAuth = firebase.auth();
    // this.fbAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  public subscribeToAuthChanges = (cb: (user: User | null) => void) => {
    this.firebaseAuth.onAuthStateChanged((user) => cb(user));
  };

  public signOut = () => this.firebaseAuth.signOut();

  public signInViaGoogle = async () =>
    this.firebaseAuth.signInWithRedirect(this.googleAuthProvider);

  public signInViaEmail = async (email: string, password: string) =>
    this.firebaseAuth.signInWithEmailAndPassword(email, password);

  public createUserViaEmail = async (email: string, password: string) =>
    this.firebaseAuth.createUserWithEmailAndPassword(email, password);

  public getToken = async (): Promise<string | undefined> =>
    this.firebaseAuth.currentUser?.getIdToken();
}

export default new AuthService();
