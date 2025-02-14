import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize HOD account
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const initializeHOD = async () => {
  try {
    const hodEmail = "hod@example.com";
    const hodPassword = "securepassword123"; // Change this in production

    // Check if HOD account already exists
    const usersRef = collection(db, 'users');
    const hodQuery = await getDoc(doc(usersRef, 'hod_cs')); // Unique ID for HOD

    if (!hodQuery.exists()) {
      // Create HOD account in Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, hodEmail, hodPassword);
      
      // Create HOD document in Firestore
      await setDoc(doc(usersRef, userCredential.user.uid), {
        email: hodEmail,
        role: 'hod',
        department: 'Computer Science',
        fullName: 'HOD Name',
        createdAt: new Date().toISOString()
      });

      console.log('HOD account created successfully');
    }
  } catch (error) {
    console.error('Error initializing HOD account:', error);
  }
};