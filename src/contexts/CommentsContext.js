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
        });
        setComments((prevComments) => [...prevComments, response.data]);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };

    


  // Function to update an existing comment by its ID
  const updateComment = async (id, text, videoId) => {
    try {
      const response = await axios.patch(`http://localhost:12345/api/comments/${id}`, {
        text: text,
        videoId: videoId,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, text: response.data.text } : comment
        )
      );
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };


  // Function to delete a comment by its ID
  const deleteComment = async (id, videoId) => {
    try {
      const response = await axios.delete(`http://localhost:12345/api/comments/${id}`, {
        params: { videoId },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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
