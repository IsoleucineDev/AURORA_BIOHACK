/**
 * Firebase Configuration
 * 
 * TO USE REAL FIREBASE:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Enable Firestore Database
 * 3. Copy your Firebase config from Project Settings
 * 4. Replace the placeholder config below with your actual values
 * 5. Uncomment the code below
 * 6. Update the hooks to use real Firebase (see comments in hooks files)
 */

/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
*/

// MOCK EXPORT FOR DEVELOPMENT
// Remove this when using real Firebase
export const db = null;
export const auth = null;
