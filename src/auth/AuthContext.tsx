import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  getIdToken,
  browserLocalPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, name: string, password: string) => void;
};

// Authentication Context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: "Guest",
  loading: true,
  isAdmin: false,
  login: () => {}, // This is a placeholder, will be overridden by the provider
  logout: () => {},
  signup: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Fetch the username from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const fetchedUsername = userDoc.data().username; // Assuming the field is named 'username'
          const fetchedIsAdmin = userDoc.data().isAdmin;
          setUsername(fetchedUsername);
          setIsAdmin(fetchedIsAdmin);
        } else {
          // If the username doesn't exist in Firestore for some reason, use the email as a fallback
          setUsername(user.email);
        }
      } else {
        setIsAuthenticated(false);
        setUsername(null);
      }
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await getIdToken(userCredential.user);
      if (token && userCredential.user) {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);

        // Fetch the username from Firestore
        /* const userDocRef = doc(db, "users", userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const fetchedUsername = userDoc.data().username; // Assuming the field is named 'username'
          setUsername(fetchedUsername);
          message.success(`Successfully logged in as ${fetchedUsername}!`);
        } */

        // const userDocRef = doc(db, "users", userCredential.user.uid);
        //const userDoc = await getDoc(userDocRef);
        if (userCredential.user) {
          const userDocRef = doc(db, "users", userCredential.user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData?.isAuthorized) {
              if (!userData?.isIntroSeen) {
                message.success("Welcome aboard!");
                navigate("/Intro"); // Redirect to Intro if isIntroSeen is false
              } else {
                message.success(`Welcome back, ${userData.username}!`);
                navigate("/"); // Redirect to dashboard or home page
              }
            } else {
              message.error("User not authorized.");
              navigate("/NotAuthorized");
            }
          }
        }

        /*  navigate("/signin"); // Redirect to /dashboard */
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Error: ${error.message}`);
      } else {
        message.error(`An unknown error occurred.`);
      }
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        // Set the user's display name in Firebase Auth
        await updateProfile(userCredential.user, { displayName: name });

        // Save additional user details in Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
          username: name,
          email: email,
          isAuthorized: false,
          isIntroSeen: false,
        });

        message.success("Signup successful! Please wait for authorization.");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Error: ${error.message}`);
      } else {
        message.error(`An unknown error occurred.`);
      }
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        message.success("Successfully logged out!"); // Success message
      })
      .catch((error) => {
        message.error(`Error: ${error.message}`); // Display the specific error message
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        signup,
        username,
        loading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
