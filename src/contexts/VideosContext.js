import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for managing videos and user likes
const VideosContext = createContext();

// Provider component to wrap around the app and provide video-related functionality
export const VideosProvider = ({ children }) => {
  // State to hold the list of videos
  const [videos, setVideos] = useState([]);
  
  // State to track which users have liked which videos
  const [userLikes, setUserLikes] = useState({});

  // Load default videos from JSON when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:12345/api/videos'); // Update the URL to your server endpoint
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Function to add a new video to the list
  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  // Function to update details of a video by ID
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
  }

  // Function to toggle like status of a video by a user
  const toggleLikeVideo = async (username, videoId) => {
    try {
      // Make the API call to update the like status
      const response = await axios.post(`http://localhost:12345/api/videos/${videoId}/like`, { username });

      if (response.status === 200) {
        // Update the local state based on the response from the server
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

  // Function to delete a video by ID
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:12345/api/videos/${id}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Provide the context value to be consumed by components
  return (
    <VideosContext.Provider
      value={{ videos, addVideo, updateVideoDetails, toggleLikeVideo, deleteVideo, userLikes, getVideosByUsername }}
    >
      {children} {/* Render children components wrapped by this provider */}
    </VideosContext.Provider>
  );
};

// Custom hook to easily access video context from any component
export const useVideos = () => useContext(VideosContext);
