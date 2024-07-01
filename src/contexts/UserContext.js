import React, { createContext, useContext, useState, useEffect } from 'react';
import tokenVerification from '../tokenAuth/tokenVerification';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setCurrentUser(null);
  };

  const getProfilePicture = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/picture/${username}`);
      if (response.status === 200) {
        return response.data.profilePicture;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return null;
    }
  }; 

  const verifyToken = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const userData = await tokenVerification(token);
      if (userData) {
        setCurrentUser(userData);
      } else {
        logout();
      }
    }
  };

  useEffect(() => {
    verifyToken();

    // Set up an interval to verify the token every 5 minutes
    const interval = setInterval(verifyToken, 300000);

    // Clean up the timeout and interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setUser, logout, getProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
