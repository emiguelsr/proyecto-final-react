import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const placeholderPattern = /^(TU_|tu_|YOUR_|your_|REPLACE_ME|CHANGE_ME|DUMMY|dummy|placeholder)/;

const firebaseReady = Object.values(firebaseConfig).every(
  (value) => Boolean(value) && !placeholderPattern.test(String(value))
);
const app = firebaseReady ? initializeApp(firebaseConfig) : null;

export const db = app ? getFirestore(app) : null;
export { firebaseReady };
