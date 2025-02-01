// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-firebase-d24e0.firebaseapp.com",
  projectId: "react-firebase-d24e0",
  storageBucket: "react-firebase-d24e0.firebasestorage.app",
  messagingSenderId: "746740143689",
  appId: "1:746740143689:web:ac13285af9b4a14e0c1198"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);