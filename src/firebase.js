import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSleAa3kuuT34GfIjAIbCDErln4YQgRdY",
  authDomain: "rapid-chat-cf792.firebaseapp.com",
  projectId: "rapid-chat-cf792",
  storageBucket: "rapid-chat-cf792.appspot.com",
  messagingSenderId: "366376552258",
  appId: "1:366376552258:web:62f82fa7d93b8f292faadb"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const storage = getStorage(app);
 export const db = getFirestore(app);