// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYhw0EXtPDMjkCMU5Te9LcZjv4v3dq_hg",
  authDomain: "mobile-forum-project.firebaseapp.com",
  databaseURL: "https://mobile-forum-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobile-forum-project",
  storageBucket: "mobile-forum-project.firebasestorage.app",
  messagingSenderId: "227130559860",
  appId: "1:227130559860:web:c7a9ce8903ca7ce0d53021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

