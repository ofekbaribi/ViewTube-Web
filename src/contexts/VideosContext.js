import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [userLikes, setUserLikes] = useState({});

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:12345/api/videos'); // Update the URL to your server endpoint
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const addViewCount = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:12345/api/videos/${id}/view`);
      const updatedVideo = response.data;

      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === id ? { ...video, ...updatedVideo } : video))
      );
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  const updateVideoDetails = async (id, updates) => {
    try {
      const response = await axios.patch(`http://localhost:12345/api/videos/${id}`, updates);
      const updatedVideo = response.data;

      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === id ? { ...video, ...updatedVideo } : video))
      );
      return updatedVideo;
    } catch (error) {
      console.error('Error updating video:', error);
      return videos.find((video) => video.id === id);
    }
  };

  const getVideosByUsername = (username) => {
    return videos ? videos.filter(video => video.uploader === username) : [];
  };

  const toggleLikeVideo = async (username, videoId) => {
    try {
      const response = await axios.post(`http://localhost:12345/api/videos/${videoId}/like`, { username });

      if (response.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.map((video) => {
            if (video.id === videoId) {
              const hasLiked = video.likedBy.includes(username);
              const updatedLikes = hasLiked ? video.likes - 1 : video.likes + 1;
              return { ...video, likes: updatedLikes, likedBy: hasLiked ? video.likedBy.filter(user => user !== username) : [...video.likedBy, username] };
            }
            return video;
          })
        );

        setUserLikes((prevUserLikes) => {
          const userLikedVideos = prevUserLikes[username] || [];
          const hasLiked = userLikedVideos.includes(videoId);
          const updatedUserLikedVideos = hasLiked
            ? userLikedVideos.filter((id) => id !== videoId)
            : [...userLikedVideos, videoId];
          return { ...prevUserLikes, [username]: updatedUserLikedVideos };
        });
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  const deleteUserVideos = async (username) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.uploader !== username));
  };

  // Function to delete a video by ID
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:12345/api/videos/${id}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <VideosContext.Provider
      value={{ videos, addVideo, updateVideoDetails, toggleLikeVideo, deleteVideo, userLikes, getVideosByUsername, addViewCount, deleteUserVideos }}
    >
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => useContext(VideosContext);
