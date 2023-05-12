import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABa487FU2_kxTLIn41wDJgZUxIhk3GTqM",
  authDomain: "olx-clone-73909.firebaseapp.com",
  projectId: "olx-clone-73909",
  storageBucket: "olx-clone-73909.appspot.com",
  messagingSenderId: "1046770181270",
  appId: "1:1046770181270:web:2664d9c3b82a8c2702ceb7",
  measurementId: "G-XY790546KB",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
