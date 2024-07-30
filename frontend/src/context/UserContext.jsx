import React, { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const userdata = localStorage.getItem("user-email");
    setUser(JSON.parse(userdata));
  },[]);

  const logoutUser = () => {
    localStorage.removeItem("user-email");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
