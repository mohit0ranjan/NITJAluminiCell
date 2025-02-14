import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

const departments = [
  {
    id: 'cse',
    name: 'Computer Science Engineering',
    code: 'CSE',
    email: 'hod.cse@nitj.ac.in',
    hodName: 'Dr. CSE HOD'
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    code: 'EE',
    email: 'hod.ee@nitj.ac.in',
    hodName: 'Dr. EE HOD'
  }
];

const setupHODs = async () => {
  try {
    // First create departments
    for (const dept of departments) {
      // Create department document
      await setDoc(doc(db, 'departments', dept.id), {
        name: dept.name,
        code: dept.code,
        createdAt: new Date().toISOString()
      });

      // Check if HOD account already exists
      const hodQuery = await getDoc(doc(db, 'users', `hod_${dept.id}`));
      
      if (!hodQuery.exists()) {
        // Create HOD account with default password
        const defaultPassword = 'HodNITJ@2025';
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, dept.email, defaultPassword);
          const uid = userCredential.user.uid;

          // Create HOD document in users collection
          await setDoc(doc(db, 'users', uid), {
            email: dept.email,
            fullName: dept.hodName,
            role: 'hod',
            department: dept.name,
            departmentId: dept.id,
            createdAt: new Date().toISOString(),
            lastLogin: null
          });

          // Update department with HOD reference
          await setDoc(doc(db, 'departments', dept.id), {
            hodId: uid
          }, { merge: true });

          console.log(`HOD account created for ${dept.name}`);
          console.log('Email:', dept.email);
          console.log('Default Password:', defaultPassword);
          console.log('-------------------');
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            console.log(`HOD account for ${dept.name} already exists`);
          } else {
            console.error(`Error creating HOD account for ${dept.name}:`, error);
          }
        }
      } else {
        console.log(`HOD account for ${dept.name} already exists`);
      }
    }
  } catch (error) {
    console.error('Error in HOD setup:', error);
  }
};

setupHODs();