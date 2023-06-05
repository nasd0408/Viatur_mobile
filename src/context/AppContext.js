import React, { createContext } from 'react';
import { UserContext } from './UserContext';
import { SiteContext } from './SiteContext';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // You can access the user state and functions using the UserContext
  const userContextValue = React.useContext(UserContext);

  // You can access the site state and functions using the SiteContext
  const siteContextValue = React.useContext(SiteContext);

  // Merge the values from both contexts into a single object
  const appContextValue = {
    ...userContextValue,
    ...siteContextValue,
    // You can add more context values here
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
