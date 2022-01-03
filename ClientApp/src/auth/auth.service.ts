// docs: https://firebase.google.com/docs/auth/web/manage-users
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  User,
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

class AuthService {
  private readonly firebaseConfig = {
    apiKey: "AIzaSyBNCZ59HJ51Fa4EF5AfN1M0Klg0dp0jXyM",
    authDomain: "creaturesncaves.firebaseapp.com",
    databaseURL: "https://creaturesncaves.firebaseio.com",
    projectId: "creaturesncaves",
    storageBucket: "creaturesncaves.appspot.com",
    messagingSenderId: "961563056714",
    appId: "1:961563056714:web:ef0361fcca28b5a6fda4b3",
    measurementId: "G-QNB7XX9FPH"
  };

  private readonly firebaseAuth: Auth;

  // private readonly fbAuthProvider: FacebookAuthProvider;
  private readonly googleAuthProvider: GoogleAuthProvider;

  constructor() {
    if (getApps().length === 0) initializeApp(this.firebaseConfig);
    this.firebaseAuth = getAuth();
    // this.fbAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.googleAuthProvider = new GoogleAuthProvider();
  }

  public subscribeToAuthChanges = (cb: (user: User | null) => void) => {
    this.firebaseAuth.onAuthStateChanged((user) => cb(user));
  };

  public signOut = () => this.firebaseAuth.signOut();

  public signInViaGoogle = async () =>
    signInWithRedirect(this.firebaseAuth, this.googleAuthProvider);

  public signInViaEmail = async (email: string, password: string) =>
    signInWithEmailAndPassword(this.firebaseAuth, email, password);

  public createUserViaEmail = async (email: string, password: string) =>
    createUserWithEmailAndPassword(this.firebaseAuth, email, password);

  public getToken = async (): Promise<string | undefined> =>
    this.firebaseAuth.currentUser?.getIdToken();
}

export default new AuthService();
