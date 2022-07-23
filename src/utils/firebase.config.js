import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtY5MoByr34wbg9M3HE48-YJgkhewFD_c",
  authDomain: "fir-auth-24a47.firebaseapp.com",
  projectId: "fir-auth-24a47",
  storageBucket: "fir-auth-24a47.appspot.com",
  messagingSenderId: "904619380292",
  appId: "1:904619380292:web:0386d169161a2add95f611",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
