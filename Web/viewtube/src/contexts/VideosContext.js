import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultVideos from '../data/db.json';

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [userLikes, setUserLikes] = useState({}); // Track which users have liked which videos

  useEffect(() => {
    setVideos(defaultVideos);
  }, []);

  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  const toggleLikeVideo = (userId, videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          const hasLiked = userLikes[userId]?.includes(videoId);
          const updatedLikes = hasLiked ? video.likes - 1 : video.likes + 1;
          return { ...video, likes: updatedLikes };
        }
        return video;
      })
    );

    setUserLikes((prevUserLikes) => {
      const userLikedVideos = prevUserLikes[userId] || [];
      const hasLiked = userLikedVideos.includes(videoId);
      const updatedUserLikedVideos = hasLiked
        ? userLikedVideos.filter((id) => id !== videoId)
        : [...userLikedVideos, videoId];
      return { ...prevUserLikes, [userId]: updatedUserLikedVideos };
    });
  };

  return (
    <VideosContext.Provider value={{ videos, addVideo, toggleLikeVideo, userLikes }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => useContext(VideosContext);
