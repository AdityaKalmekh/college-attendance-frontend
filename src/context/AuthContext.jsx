import React, { useContext, useEffect, useMemo, useState } from "react";
import { fireAuth } from "../firebase";
import { login, logout } from "../api/auth";
import { getUser } from "../api/users";

const AuthContext = React.createContext({
  googleLogin: () =>
    new Promise((resolve) => {
      resolve(false);
    }),
  logout: () =>
    new Promise((resolve) => {
      resolve(false);
    }),
  user: undefined,
  userNotExistInDb: false,
  isProf: false,
  isAdmin: false,
  isStudent: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userNotExistInDb, setUserNotExistInDb] = useState(false);
  const isProf = user?.role === "Profecer";
  const isAdmin = user?.role === "Admin";
  const isStudent = user?.role === "Student";

  useEffect(() => {
    fireAuth.onAuthStateChanged((u) => {
      if (u) {
        getUser(u.email).then((userData) => {
          if (userData) {
            setUser({
              ...u,
              ...userData,
            });
            setUserNotExistInDb(false);
          } else {
            setUserNotExistInDb(u);
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userNotExistInDb,
      googleLogin: login,
      logout,
      isProf,
      isAdmin,
      isStudent,
    }),
    [user, userNotExistInDb, isProf, isAdmin, isStudent]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
