import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setLoading(true);
      setCurrentUser(user);
    });
  }, []);

  const value = { loading, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
