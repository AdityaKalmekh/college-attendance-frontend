import React, { useContext, useEffect, useMemo, useState } from "react";
import { login, logout } from "../api/auth";

const AuthContext = React.createContext({
  googleLogin: () =>
    new Promise((resolve) => {
      resolve(false);
    }),
  logout: () =>
    new Promise((resolve) => {
      resolve(false);
    }),
  id : undefined,
  user : undefined,
  userNotExistInDb: false,
  isProf: false,
  isAdmin: false,
  isStudent: false,
  onLogin : () => {},
  userHandler : (role) => {}
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [userNotExistInDb, setUserNotExistInDb] = useState(false);
  const isProf = user?.role === "Profecer";
  const isAdmin = user?.role === "Admin";
  const isStudent = user?.role === "Student";

  // useEffect(() => {
  //   fireAuth.onAuthStateChanged((u) => {
  //     if (u) {
  //       getUser(u.email).then((userData) => {
  //         if (userData) {
  //           setUser({
  //             ...u,
  //             ...userData,
  //           });
  //           setUserNotExistInDb(false);
  //         } else {
  //           setUserNotExistInDb(u);
  //         }
  //       });
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);
  const idHandler = (id) => {
    setId(id);
  }

  const userHandler = (role) => {
    setUser(role);
  }

  const logoutHandler = () => {
    setUserNotExistInDb(false);
  }

  const loginHandler = () => {
    setUserNotExistInDb(true);
  }

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
  return <AuthContext.Provider value={{
    userNotExistInDb : userNotExistInDb,
    onLogout : logoutHandler,
    onLogin : loginHandler,
    user : user,
    id: id,
    idHandler : idHandler,
    userHandler : userHandler,
  }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContext