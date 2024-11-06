import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const login = (newToken, newuser) => {
    setToken(newToken);
    setUser(newuser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newuser));
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
