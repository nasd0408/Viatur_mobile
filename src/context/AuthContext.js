import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { SiteContext } from './SiteContext';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null
  });

  const TOKEN_KEY = 'my-jwt';
  const API_URL = 'https://api.developbetterapps.com';

  const { reloadData } = useContext(SiteContext);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true
        });
      }
    };

    loadToken();
  }, []);

  const register = async (email, password) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };
  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });

      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      // Reload the data once the user is logged in
      reloadData();

      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: null,
    });

    // Reload the data once the user is logged out
    reloadData();
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
