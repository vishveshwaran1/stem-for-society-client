// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABEvYzmvf9DIFsNfH60VzkOfBUUrZuTzw",
  authDomain: "stemforsociety-edb4d.firebaseapp.com",
  projectId: "stemforsociety-edb4d",
  storageBucket: "stemforsociety-edb4d.firebasestorage.app",
  messagingSenderId: "1044490983502",
  appId: "1:1044490983502:web:094a3a813c24a338674b1f",
  measurementId: "G-Q0FLY7FYS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
