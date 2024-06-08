// src/contexts/CommentsContext.js
import React, { createContext, useState, useContext } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const getCommentsByVideoId = (videoId) => {
    return comments.filter((comment) => comment.videoId === videoId);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment, getCommentsByVideoId }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentsContext);
};
