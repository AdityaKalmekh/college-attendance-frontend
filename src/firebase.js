// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbUO-bHYnNzKEIiE5o8xWU5V0lQo5Iwp0",
  authDomain: "collage-attendence-system.firebaseapp.com",
  projectId: "collage-attendence-system",
  storageBucket: "collage-attendence-system.appspot.com",
  messagingSenderId: "1031721689191",
  appId: "1:1031721689191:web:5882b745b787b9fb3874c2",
  measurementId: "G-J74Q3S0FTJ",
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const fireAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const fireStorage = getStorage(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
