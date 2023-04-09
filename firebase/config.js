import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCl_9HSW8rdKpb6pPLIj5kYLv1LHGXitwY",

  authDomain: "react-native-auth-45589.firebaseapp.com",

  projectId: "react-native-auth-45589",

  storageBucket: "react-native-auth-45589.appspot.com",

  messagingSenderId: "615257112135",

  appId: "1:615257112135:web:4c76ff7a6cc6ec746efb62",

  measurementId: "G-NYD4MCV5CD"

}

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);