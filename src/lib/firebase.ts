import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD8bWCkei6dFyaLP4A1Xj8vQwZHJY7L56s",
  authDomain: "golfpad3.firebaseapp.com",
  projectId: "golfpad3",
  storageBucket: "golfpad3.firebasestorage.app",
  messagingSenderId: "557801839701",
  appId: "1:557801839701:web:9b9bced0ff8ee4965748dc",
  measurementId: "G-FB98MLZL65"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Google sign-in failed:', error);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-out failed:', error);
  }
}
