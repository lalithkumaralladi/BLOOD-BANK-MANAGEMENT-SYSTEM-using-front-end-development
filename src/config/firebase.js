import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAAl3Twr4VNZwBZw3lJFGsVqwHI6dnY0w",
  authDomain: "bank-management-system-b6ff4.firebaseapp.com",
  projectId: "bank-management-system-b6ff4",
  storageBucket: "bank-management-system-b6ff4.appspot.com",
  messagingSenderId: "1050913410699",
  appId: "1:1050913410699:web:YOUR_APP_ID"  // You'll need to complete this from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
