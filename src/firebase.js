// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBM2OmLYVnLS6_ow53slKrPtv5NOeio-Es",
  authDomain: "chatt-ad7ac.firebaseapp.com",
  projectId: "chatt-ad7ac",
  storageBucket: "chatt-ad7ac.appspot.com",
  messagingSenderId: "1079422629010",
  appId: "1:1079422629010:web:fb92d8cde93890232a224b",
  measurementId: "G-HL74X722ZW"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default db;