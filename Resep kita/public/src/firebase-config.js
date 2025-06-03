import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTYczJwTGXiq01NqDok_TJT2jP1frGYTY",
  authDomain: "fir-config-d102b.firebaseapp.com",
  projectId: "fir-config-d102b",
  storageBucket: "fir-config-d102b.firebasestorage.app",
  messagingSenderId: "339985470764",
  appId: "1:339985470764:web:c7406de3789b4c7084c889",
  measurementId: "G-QZL7S48FF5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);