// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, userLogin } from "../services/user-service";

interface User {
  id: number;
  name: string;
  username: string;
}

const AuthContext = createContext<{
  loggedInUser: User | null;
  allUsers: User[];
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  loggedInUser: null,
  allUsers: [],
  login: () => null,
  logout: () => null,
});

export function AuthProvider({ children }: any) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [allUsers, setAllUser] = useState<User[]>([]);
  useEffect(() => {
    getAllUsers(setAllUser, console.error);
  }, []);

  useEffect(() => {
    console.log("AuthProvider - loggedInUser: ", loggedInUser);
  }, [loggedInUser]);

  const login = (username: string, password: string): boolean => {
    console.log("AuthProvider - login, :", username, password);
    userLogin(
      username,
      password,
      (userRes) => {
        console.log("Login success");
        setLoggedInUser(userRes);
      },
      (e) => {
        console.log("Login failed");
        console.error(e);
      }
    );
    return true;
  };

  const logout = (): void => {
    // Clear the current user in the context
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, allUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
