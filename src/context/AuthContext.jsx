import { createContext, useState, useContext, useEffect } from "react";
import { signupRequest, loginRequest, veryfyTokenRequest, logoutRequest } from "../api/api";

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
      localStorage.setItem('token', JSON.stringify(res.data.token));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem('token', JSON.stringify(res.data.token));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      const token = {token: JSON.parse(localStorage.getItem('token'))}
      if (token.token!=null) {
        try {
          const res = await veryfyTokenRequest(token);
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
