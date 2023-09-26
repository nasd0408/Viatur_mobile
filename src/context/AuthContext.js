import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from "../utils/dev";

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
  const API_URL = API_BASE_URL;


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
    axios.defaults.headers.common["user-agent"] = 'MobileApp'
  }, []);

  const register = async (formData) => {
    try {
      console.log(formData);
      const headers = {
        'Accept': '*/*',
        'content-type' : 'multipart/form-data'
      };
  
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: headers
      });
      
      return response.headers;

    } catch (e) {
      return { error: true, msg: e };
    }
  };
  
  const login = async (email, contrasena) => {
  try {
    const result = await axios.post(`${API_URL}/auth/login`, { email, contrasena });

    if (result.data.statusCode === 400 && result.data.message === 'VO01') {
      throw new Error('Invalid email or password. Please try again.'); // Custom error message
    }

    setAuthState({
      token: result.data.token,
      authenticated: true
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
    await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

    return result;
  } catch (e) {
    return { error: true, msg: e.response.data };
  }
};


  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: null,
    });;
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
