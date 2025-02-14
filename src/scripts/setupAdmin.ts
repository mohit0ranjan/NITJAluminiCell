import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const setupAdmin = async () => {
  try {
    // Admin credentials - change these in production!
    const adminEmail = "admin@nitj.ac.in";
    const adminPassword = "Admin@123";

    // Check if admin already exists
    const adminDoc = await getDoc(doc(db, 'users', 'admin'));
    
    if (!adminDoc.exists()) {
      // Create admin account
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      const uid = userCredential.user.uid;

      // Create admin document
      await setDoc(doc(db, 'users', uid), {
        email: adminEmail,
        fullName: 'System Administrator',
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: null
      });

      console.log('Admin account created successfully');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
    }
  } catch (error: any) {
    console.error('Error creating admin account:', error);
  }
};

setupAdmin();