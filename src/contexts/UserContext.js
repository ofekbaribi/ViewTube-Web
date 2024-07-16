import React, { createContext, useContext, useState, useEffect } from 'react';
import tokenVerification from '../tokenAuth/tokenVerification'; // Import token verification function
import axios from 'axios'; // Import Axios for HTTP requests
import { useVideos } from './VideosContext'; // Import useVideos hook from VideosContext

// Create context for user-related data
const UserContext = createContext();

// UserProvider component to manage user state and provide user-related functions
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to store current user
  const { removeUserVideos } = useVideos(); // Access removeUserVideos function from VideosContext

  // Function to set current user in state
  const setUser = (user) => {
    setCurrentUser(user);
  };

  // Function to log out user
  const logout = () => {
    localStorage.removeItem('jwtToken'); // Remove JWT token from local storage
    setCurrentUser(null); // Clear currentUser state
  };

  // Function to fetch profile picture for a user
  const getProfilePicture = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/picture/${username}`); // Fetch profile picture
      if (response.status === 200) {
        return response.data.profilePicture; // Return profile picture URL if successful
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile picture:', error); // Log error if request fails
      return null;
    }
  };

  // Function to fetch user data by username
  const getUserData = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/${username}`); // Fetch user data
      if (response.status === 200) {
        return response.data; // Return user data if successful
      }
      return null;
    } catch (error) {
      console.error('Error fetching user details:', error); // Log error if request fails
      return null;
    }
  };

  // Function to verify JWT token validity
  const verifyToken = async () => {
    const token = localStorage.getItem('jwtToken'); // Get JWT token from local storage
    if (token) {
      const userData = await tokenVerification(token); // Verify token using tokenVerification function
      if (userData) {
        setCurrentUser(userData); // Set current user if token is valid
      } else {
        logout(); // Log out user if token is invalid
      }
    }
  };

  // Function to verify token before video upload
  const verifyTokenBeforeVideoUpload = async () => {
    const token = localStorage.getItem('jwtToken'); // Get JWT token from local storage
    if (token) {
      return await tokenVerification(token); // Return verified token data
    }
  };

  // Function to update user data (first name, last name, image)
  const updateUserData = async (username, firstName, lastName, image) => {
    try {
      const response = await axios.put(`http://localhost:12345/api/users/${username}`, { // Update user data
        firstName: firstName,
        lastName: lastName,
        image: image
      });
      if (response.status === 200) {
        setCurrentUser(response.data); // Set current user with updated data
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user data:', error); // Log error if request fails
      return false;
    }
  };

  // Function to update user password
  const updateUserPassword = async (username, currentPassword, newPassword) => {
    try {
      const response = await axios.post('http://localhost:12345/api/users/password', { // Update user password
        username: username,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      if (response.status === 200) {
        setCurrentUser(response.data.user); // Set current user with updated data
        localStorage.setItem('jwtToken', response.data.token); // Update JWT token in local storage
      }
      return response.status; // Return response status
    } catch (error) {
      console.error('Error updating user password:', error); // Log error if request fails
      return null;
    }
  };

  // Function to delete user account
  const deleteUser = async (username, password) => {
    try {
      const response = await axios.delete(`http://localhost:12345/api/users/${username}`, { // Delete user account
        data: { password: password }
      });

      if (response.status === 200) {
        logout(); // Log out user if deletion is successful
      }

      return response; // Return response
    } catch (error) {
      console.error('Error deleting user:', error); // Log error if request fails
      return null;
    }
  };

  // Effect to verify token on component mount and set interval to verify token every 5 minutes
  useEffect(() => {
    verifyToken();

    const interval = setInterval(verifyToken, 300000); // Verify token every 5 minutes (300000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  // Provide UserContext.Provider with user-related values and functions to children components
  return (
    <UserContext.Provider value={{ 
      currentUser, // Current user data
      setUser, // Function to set current user
      logout, // Function to log out user
      getProfilePicture, // Function to fetch profile picture
      verifyTokenBeforeVideoUpload, // Function to verify token before video upload
      getUserData, // Function to fetch user data by username
      updateUserData, // Function to update user data
      updateUserPassword, // Function to update user password
      deleteUser, // Function to delete user account
    }}>
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext values and functions
export const useUser = () => useContext(UserContext);

export default UserContext;
