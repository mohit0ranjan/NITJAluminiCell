import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  userDepartment: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userDepartment, setUserDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserRole = async () => {
    if (currentUser) {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const role = userDoc.data()?.role || 'alumni';
      const department = userDoc.data()?.department || null;
      setUserRole(role);
      setUserDepartment(department);
      return role;
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const usersRef = collection(db, 'users');
        const userDoc = await getDoc(doc(usersRef, user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(usersRef, user.uid), {
            email: user.email,
            role: 'alumni',
            createdAt: new Date().toISOString()
          });
          setUserRole('alumni');
          setUserDepartment(null);
        } else {
          const role = userDoc.data()?.role || 'alumni';
          const department = userDoc.data()?.department || null;
          setUserRole(role);
          setUserDepartment(department);
        }
      } else {
        setUserRole(null);
        setUserDepartment(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const role = userDoc.data()?.role || 'alumni';
      const department = userDoc.data()?.department || null;
      setUserRole(role);
      setUserDepartment(department);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', user.uid), {
      email,
      fullName,
      role: 'alumni',
      createdAt: new Date().toISOString()
    });
  };

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    userRole,
    userDepartment,
    login,
    register,
    logout,
    loading,
    refreshUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};