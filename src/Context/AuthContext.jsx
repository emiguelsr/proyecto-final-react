import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
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
  const localAuthKey = "react_copilot_local_user_v1";

  const saveLocalUser = (nextUser) => {
    localStorage.setItem(localAuthKey, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const clearLocalUser = () => {
    localStorage.removeItem(localAuthKey);
    setUser(null);
  };

  const login = (email, password) => {
    if (!auth) {
      const nextUser = {
        email,
        uid: email,
        rol: email.toLowerCase().includes("admin") ? "admin" : "user",
      };

      saveLocalUser(nextUser);
      return Promise.resolve({ user: nextUser });
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    if (!auth) {
      const nextUser = { email, uid: email, rol: "user" };

      saveLocalUser(nextUser);
      return Promise.resolve({ user: nextUser });
    }

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (!auth) {
      clearLocalUser();
      return Promise.resolve();
    }

    return signOut(auth);
  };

  useEffect(() => {
    if (!auth) {
      try {
        const savedUser = localStorage.getItem(localAuthKey);
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        clearLocalUser();
      }

      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        if (db) {
          const ref = doc(db, "usuarios", currentUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists() && snap.data().rol === "admin") {
            setUser({ ...currentUser, rol: "admin" });
          } else {
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
      {!loading && children}
    </AuthContext.Provider>
  );
}
