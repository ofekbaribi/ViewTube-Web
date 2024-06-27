import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for comments management
const CommentsContext = createContext();

// Provider component to wrap around the app and provide comments functionality
export const CommentsProvider = ({ children }) => {
  // State to hold the comments
  const [comments, setComments] = useState([]);


    const addComment = async (comment) => {
      try {
        const response = await axios.post('http://localhost:12345/api/comments', {
          id: comment.id,
          text: comment.text,
          uploader: comment.uploader,
          videoId: comment.videoId,
        }); // Update the URL to your server endpoint
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    


  // Function to update an existing comment by its ID
  const updateComment = (id, text) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  // Function to delete a comment by its ID
  const deleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };




  // Provide the context value to be consumed by components
  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

// Custom hook to easily access comments context from any component
export const useComments = () => useContext(CommentsContext);
