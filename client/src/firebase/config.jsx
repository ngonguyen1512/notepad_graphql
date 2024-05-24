// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZqpjfI48F8SmQrwO2Vao9Qd9OeZjF9KQ",
  authDomain: "note-app-ngonguyen.firebaseapp.com",
  projectId: "note-app-ngonguyen",
  storageBucket: "note-app-ngonguyen.appspot.com",
  messagingSenderId: "800000662052",
  appId: "1:800000662052:web:6837f7ec06724c154556b1",
  measurementId: "G-4NJPGZSCV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);