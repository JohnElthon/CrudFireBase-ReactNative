
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaYpZb0YAuK6HmFEJ8_F7kIT2udBkB14s",
  authDomain: "tds03-9f51a.firebaseapp.com",
  projectId: "tds03-9f51a",
  storageBucket: "tds03-9f51a.firebasestorage.app",
  messagingSenderId: "368414661460",
  appId: "1:368414661460:web:a545e4f5574a0cd83a86c1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};