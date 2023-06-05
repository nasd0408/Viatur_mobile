import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children }) => {
  // Define the state for user data
  const [user, setUser] = useState({
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    birthdate: '1990-01-01',
    isLoggedIn: true, // Set the initial value to false
  });

  // Create the context value object
  const contextValue = {
    user,
    setUser,
  };

  // Render the children components within the context provider
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
