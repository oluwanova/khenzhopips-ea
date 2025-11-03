import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Retrieve Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Add a check to ensure all required variables are present
if (!firebaseConfig.apiKey) {
  throw new Error("Missing Firebase API Key. Please check your .env.local file.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use in other files
// This is a NAMED EXPORT, so you import it with { auth }
export const auth = getAuth(app);