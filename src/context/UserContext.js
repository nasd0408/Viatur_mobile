import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../utils/dev';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { authState } = useAuth(); // Access the outer context

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/user-data`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (response.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {

    // Only fetch user data if authenticated is true, otherwise clear the data
    if (authState.authenticated) {
      fetchUserData();
    } else {
      setUserData(null); // Clear the user data when not authenticated
    }
  }, [authState]);

  const value = {
    userData,
    fetchUserData
    
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
