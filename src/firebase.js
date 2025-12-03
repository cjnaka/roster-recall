import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdNaF7XlrP1Qp0X5uhzFGdQ6NXPZYbfMk",
  authDomain: "roster-recall.firebaseapp.com",
  projectId: "roster-recall",
  storageBucket: "roster-recall.firebasestorage.app",
  messagingSenderId: "872731243106",
  appId: "1:872731243106:web:273ecc438562e2e209d73b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);