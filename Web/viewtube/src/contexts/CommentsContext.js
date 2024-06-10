import React, { createContext, useContext, useState } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const updateComment = (id, text) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  const deleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const getCommentsByVideoId = (videoId) => {
    return comments.filter((comment) => comment.videoId === videoId);
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        deleteComment,
        getCommentsByVideoId,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
