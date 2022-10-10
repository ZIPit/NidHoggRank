// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByAC4yqqU-tuB68bN0lHo5f2cBG8c1hu4",
  authDomain: "fir-hogg.firebaseapp.com",
  projectId: "fir-hogg",
  storageBucket: "fir-hogg.appspot.com",
  messagingSenderId: "336679069459",
  appId: "1:336679069459:web:d8794141bebc8a01e31ce6",
  measurementId: "G-W89GBEFTS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
