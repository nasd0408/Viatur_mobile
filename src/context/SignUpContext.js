// Create a context for signup data
import React, { createContext, useContext } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
const formData = new FormData()
function clearForm(){
  formData = new formData()
}
function setFormData(key, value) {
  if (value !== undefined) {
    formData.append(key, value);
  }
}
  return (
    <SignupContext.Provider value={{ formData, setFormData, clearForm }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => {
  return useContext(SignupContext);
};
