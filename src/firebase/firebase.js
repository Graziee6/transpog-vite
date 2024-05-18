// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOCVlNDIiI_pO1sNGZCLLDc1q5NIKZ5aw",
  authDomain: "transpog.firebaseapp.com",
  databaseURL: "https://transpog-default-rtdb.firebaseio.com",
  projectId: "transpog",
  storageBucket: "transpog.appspot.com",
  messagingSenderId: "111648134244",
  appId: "1:111648134244:web:0170f10b7230c3fc4e7b71",
  measurementId: "G-684GL9448W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth}