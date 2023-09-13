import { createContext, useState, useContext, useEffect } from "react";
import { signupRequest, loginRequest, veryfyTokenRequest, logoutRequest } from "../api/api";
import Cookies from "js-cookie";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await signupRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async (user) => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      const cookie = Cookies.get();
      if (cookie.token) {
        try {
          const res = await veryfyTokenRequest(cookie.token);
          if (res.status === 200) {
            setUser(res.data);
            setIsAuthenticated(true);
            setLoading(false);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }else{
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
