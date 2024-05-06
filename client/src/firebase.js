// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rediblog-b6eb3.firebaseapp.com",
  projectId: "rediblog-b6eb3",
  storageBucket: "rediblog-b6eb3.appspot.com",
  messagingSenderId: "447037374709",
  appId: "1:447037374709:web:a74c824aa120385b6a45bc",
  measurementId: "G-RHEXG4WSB1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);