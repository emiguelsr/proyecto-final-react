import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { db, firebaseReady } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = firebaseReady ? getAuth() : null;

  const login = (email, password) => {
    if (!auth) {
      return Promise.reject(new Error("Firebase no está configurado correctamente"));
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    if (!auth) {
      return Promise.reject(new Error("Firebase no está configurado correctamente"));
    }

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (!auth) {
      return Promise.resolve();
    }

    return signOut(auth);
  };

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setLoading(false);
      return;
    }

    setPersistence(auth, browserLocalPersistence).catch(() => {
      // If persistence cannot be set, Firebase will still try its default behavior.
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        if (db) {
          try {
            const ref = doc(db, "usuarios", currentUser.uid);
            const snap = await getDoc(ref);

            if (snap.exists() && snap.data().rol === "admin") {
              setUser({ ...currentUser, rol: "admin" });
            } else {
              setUser({ ...currentUser, rol: "user" });
            }
          } catch {
            setUser({ ...currentUser, rol: "user" });
          }
        } else {
          setUser({ ...currentUser, rol: "user" });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
