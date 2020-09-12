import firebase from "firebase";
import { auth } from "firebaseui"
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

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

export const authService = firebase.auth();

export const signOut = () => authService.signOut();

export const getToken = async (): Promise<string | undefined> => {
  return authService.currentUser?.getIdToken();
}

export const authFetch = async (url: string, method = "GET"): Promise<Response | undefined> => {
  const token = await getToken();
  
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

export const authenticateApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'https://localhost:5001/api',
  });
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token 
    const token = await getToken();
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