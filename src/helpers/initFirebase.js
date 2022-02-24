// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import {initializeFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMrrNNwsybpGak6zvenLmoEtE3GqRX3iw",
  authDomain: "rowendduke.firebaseapp.com",
  projectId: "rowendduke",
  storageBucket: "rowendduke.appspot.com",
  messagingSenderId: "1015274550400",
  appId: "1:1015274550400:web:e8476eebfb961f84046265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = initializeFirestore(app,{});
export const auth = initializeAuth(app,{});

