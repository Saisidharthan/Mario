import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(()=>{
    const userdata = localStorage.getItem("user-data");
    setUser(JSON.parse(userdata));
  },[]);
  
  const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
          'Authorization': `Bearer ${user?.token}`
      }
  });

  const logoutUser = () => {
    localStorage.removeItem("user-data");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser,axiosInstance }}>
      {children}
    </UserContext.Provider>
  );
};
