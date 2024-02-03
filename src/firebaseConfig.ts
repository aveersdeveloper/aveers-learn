// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFghd3Zu7XT69xrPAbZSin4RPQu6u_EOk",
  authDomain: "aveers-elearn.firebaseapp.com",
  projectId: "aveers-elearn",
  storageBucket: "aveers-elearn.appspot.com",
  messagingSenderId: "933402020711",
  appId: "1:933402020711:web:542ab3874fd8ff912e3dc2",
  measurementId: "G-TXGQQ78XBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
