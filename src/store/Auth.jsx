// AuthContext.js
import { createContext, useContext, useState } from "react";
import { api } from "../utilities";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });
  useEffect(() => {
    // Update localStorage when isAuthenticated changes
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isAuthenticated") {
        setIsAuthenticated(JSON.parse(event.newValue));
      }
      if (event.key === "user") {
        setUser(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signOut = async () => {
    try {
      const res = await api.get("auth/signout");
      localStorage.clear();
      setUser({});
      setIsAuthenticated(false);
      return { success: true };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const signIn = async (email, password) => {
    try {
      const user = await api.post("auth/signin", {
        emailOrUsername: email,
        password: password,
      });
      const userdata = user.data.user;
      setUser(userdata);
      setIsAuthenticated(true);
      localStorage.setItem(
        "AccessToken",
        JSON.stringify(user.data.accessToken)
      );
      localStorage.setItem("user", JSON.stringify(userdata));
      return { success: true };
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
