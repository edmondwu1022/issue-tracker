import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorge } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "udemy-tutorial-react.firebaseapp.com",
    projectId: "udemy-tutorial-react",
    storageBucket: "udemy-tutorial-react.firebasestorage.app",
    messagingSenderId: "402219063508",
    appId: "1:402219063508:web:52cab1020471d1c2a18341"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorge(app);
const db = getFirestore(app);

export { app, db, storage }