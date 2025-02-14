import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const setupHOD = async () => {
  try {
    // HOD credentials - change these in production!
    const hodEmail = "hod.cs@nitj.ac.in";
    const hodPassword = "HodCS@123";

    // Create HOD account in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, hodEmail, hodPassword);
    const uid = userCredential.user.uid;

    // Create HOD document in Firestore
    await setDoc(doc(db, 'users', uid), {
      email: hodEmail,
      role: 'hod',
      department: 'Computer Science',
      fullName: 'Dr. HOD Name',
      createdAt: new Date().toISOString(),
      lastLogin: null
    });

    console.log('HOD account created successfully!');
    console.log('UID:', uid);
    console.log('Email:', hodEmail);
    
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('HOD account already exists');
    } else {
      console.error('Error creating HOD account:', error);
    }
  }
};

setupHOD();