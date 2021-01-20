import firebase from "firebase";
import { auth } from "firebaseui"
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export class AuthService {

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

  private readonly uiConfig: auth.Config = {
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
  
  private readonly firebaseAuth: firebase.auth.Auth;
  
  constructor() {
    if(firebase.apps.length === 0) firebase.initializeApp(this.firebaseConfig);
    this.firebaseAuth = firebase.auth();
  }
  
  public getFirebaseAuth = () => this.firebaseAuth;
  
  public getUiConfig = () => this.uiConfig;
  
  public signOut = () => this.firebaseAuth.signOut();
    
  public getToken = async (): Promise<string | undefined> => {
    return this.firebaseAuth.currentUser?.getIdToken();
  }

  public authFetch = async (url: string, method = "GET"): Promise<Response | undefined> => {
    const token = await this.getToken();
    
    if(!token) return;
    
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    const options = { 
      method,
      headers
    };
  
    return fetch(url, options);
  }
  
  public onAuthStateChanged = (cb: (user: firebase.User | null) => void) => { 
    this.firebaseAuth.onAuthStateChanged((user) => cb(user))
  }

  public authenticateApolloClient = () => {
    const httpLink = createHttpLink({
      uri: `${process.env.REACT_APP_SERVER_ADDRESS || ''}/api`,
    });
    const authLink = setContext(async (_: any, {headers}: any) => {
      // get the authentication token 
      const token = await this.getToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }
  
}