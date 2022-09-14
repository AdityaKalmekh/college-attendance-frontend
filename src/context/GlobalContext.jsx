import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUsers } from "../api/users";
import { getStudent } from "../api/student";

const UsersContext = createContext({
  users: [],
  setUsers: () => {},
  usersOptions: [],
  student: [],
  userNameMap: {},
});

export const GlobalContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [student, setStudents] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
    getStudent().then((res) => {
      setStudents(res);
    });
  }, []);

  const userNameMap = useMemo(() => {
    return users.reduce((acc, item) => {
      return {
        ...acc,
        [item.email]: item.firstName
          ? `${item.firstName}${item.lastName ? ` ${item.lastName}` : ""}`
          : item.email,
      };
    }, {});
  }, [users]);

  const usersOptions = useMemo(() => {
    return users.map((user) => ({
      label: userNameMap[user.email],
      value: user.email,
      role: user.role,
    }));
  }, [users, userNameMap]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
      userNameMap,
      usersOptions,
      student,
    }),
    [users, userNameMap, usersOptions, student]
  );
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
