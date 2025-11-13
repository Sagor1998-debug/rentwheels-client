import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import toast from "react-hot-toast";

// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "AIzaSyB1gO4Qs_-RXdPywdFAqF7M2_O4TMUL-5I",
  authDomain: "rentwheels-client-e7725.firebaseapp.com",
  projectId: "rentwheels-client-e7725",
  storageBucket: "rentwheels-client-e7725.appspot.com",
  messagingSenderId: "598452975555",
  appId: "1:598452975555:web:b082eaa72839acf2abef76",
  measurementId: "G-LG99JV9QD",
};

// Prevent duplicate app initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ---------------- Auth Context ----------------
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------- Register User --------
  const registerUser = async (name, email, password, photoURL) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      
      const token = await userCredential.user.getIdToken(true);
      localStorage.setItem("accessToken", token);

      setUser({ ...userCredential.user });
      toast.success("Registration successful!");
      return userCredential;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to register. Try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------- Login User --------
  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const token = await userCredential.user.getIdToken(true);
      localStorage.setItem("accessToken", token);

      setUser({ ...userCredential.user });
      toast.success("Login successful!");
      return userCredential;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------- Google Login --------
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken(true);
      localStorage.setItem("accessToken", token);

      setUser({ ...result.user });
      toast.success("Login with Google successful!");
      return result;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------- Logout --------
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------- Observe Auth State --------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Refresh token and store in localStorage
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
