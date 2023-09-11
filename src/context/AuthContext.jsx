import { createContext, useState, useContext } from "react";
import { signupRequest } from "../api/api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  const signup = async (user) => {
    try {
      const res = await signupRequest(user);
      user = setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenicated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
