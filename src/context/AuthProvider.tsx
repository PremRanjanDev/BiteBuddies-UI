// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { userLogin, userSignUp } from "../services/user-service";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  username: string;
}

interface AuthContextProps {
  loggedInUser: User | null;
  login: (username: string, password: string) => void;
  signUp: (name: string, username: string, password: string) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("loggedInUser: ", loggedInUser);
  }, [loggedInUser]);

  const login = (username: string, password: string) => {
    userLogin(username, password, setLoggedInUser, () => {
      toast.error("Invalid user name or password");
    });
  };

  const signUp = (name: string, username: string, password: string) => {
    userSignUp(name, username, password, setLoggedInUser, () => {
      toast.error("Could not create user at the moment");
    });
  };

  const logout = () => {
    setLoggedInUser(null);
    toast.success("Logged out succesfully");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
