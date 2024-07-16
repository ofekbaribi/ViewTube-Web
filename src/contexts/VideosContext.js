import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for videos-related data
const VideosContext = createContext();

// VideosProvider component to manage videos state and provide videos-related functions
export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]); // State to store videos
  const [userLikes, setUserLikes] = useState({}); // State to store user likes

  // Function to fetch all videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:12345/api/videos/all'); // Fetch all videos from server
      setVideos(response.data); // Set videos state with fetched data
    } catch (error) {
      console.error('Error fetching videos:', error); // Log error if request fails
    }
  };

  // Effect to fetch videos on component mount
  useEffect(() => {
    fetchVideos(); // Fetch videos when component mounts
  }, []);

  // Function to increment view count for a video
  const addViewCount = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:12345/api/videos/${id}/view`); // Increment view count for video
      const updatedVideo = response.data; // Updated video data from server

      // Update videos state with updated view count
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === id ? { ...video, ...updatedVideo } : video))
      );
    } catch (error) {
      console.error('Error updating video:', error); // Log error if request fails
    }
  };

  // Function to add a new video
  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]); // Add new video to videos state
  };

  // Function to update video details
  const updateVideoDetails = async (username, id, updates) => {
    try {
      const response = await axios.patch(`http://localhost:12345/api/users/${username}/videos/${id}`, updates); // Update video details
      const updatedVideo = response.data; // Updated video data from server

      // Update videos state with updated video details
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === id ? { ...video, ...updatedVideo } : video))
      );
      return updatedVideo;
    } catch (error) {
      console.error('Error updating video:', error); // Log error if request fails
      return videos.find((video) => video.id === id); // Return current video data on error
    }
  };

  // Function to fetch videos uploaded by a specific user
  const getVideosByUsername = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/${username}/videos`); // Fetch user's videos
      if (response.status === 200) {
        return response.data; // Return fetched videos data if successful
      }
    } catch (error) {
      console.error('Error fetching videos:', error); // Log error if request fails
    }
  };

  // Function to toggle like status of a video
  const toggleLikeVideo = async (username, videoId) => {
    try {
      const response = await axios.post(`http://localhost:12345/api/videos/${videoId}/like`, { username }); // Toggle like status for video

      if (response.status === 200) {
        // Update videos state with updated like status
        setVideos((prevVideos) =>
          prevVideos.map((video) => {
            if (video.id === videoId) {
              const hasLiked = video.likedBy.includes(username);
              const updatedLikes = hasLiked ? video.likes - 1 : video.likes + 1;
              return {
                ...video,
                likes: updatedLikes,
                likedBy: hasLiked ? video.likedBy.filter((user) => user !== username) : [...video.likedBy, username],
              };
            }
            return video;
          })
        );

        // Update userLikes state with updated liked videos
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
      console.error('Error toggling like status:', error); // Log error if request fails
    }
  };

  // Function to delete user's videos
  const deleteUserVideos = async (username) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.uploader !== username)); // Remove user's videos from videos state
  };

  // Function to delete a video by ID
  const deleteVideo = async (username, id) => {
    try {
      await axios.delete(`http://localhost:12345/api/users/${username}/videos/${id}`); // Delete video from server
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id)); // Remove video from videos state
    } catch (error) {
      console.error('Error deleting video:', error); // Log error if request fails
    }
  };

  // Function to fetch hot videos
  const fetchHotVideos = async () => {
    try {
      const response = await axios.get('http://localhost:12345/api/videos'); // Fetch hot videos from server
      if (response.status === 200) {
        return response.data; // Return fetched hot videos data if successful
      }
      return videos; // Return current videos state on error
    } catch (error) {
      console.error('Error fetching hot videos:', error); // Log error if request fails
    }
  };

  // Provide VideosContext.Provider with videos-related values and functions to children components
  return (
    <VideosContext.Provider
      value={{
        videos, // All videos
        addVideo, // Function to add a new video
        updateVideoDetails, // Function to update video details
        toggleLikeVideo, // Function to toggle like status of a video
        deleteVideo, // Function to delete a video by ID
        userLikes, // User's liked videos
        getVideosByUsername, // Function to fetch videos uploaded by a specific user
        addViewCount, // Function to increment view count for a video
        deleteUserVideos, // Function to delete user's videos
        fetchHotVideos, // Function to fetch hot videos
      }}
    >
      {children} {/* Render children components */}
    </VideosContext.Provider>
  );
};

// Custom hook to access VideosContext values and functions
export const useVideos = () => useContext(VideosContext);

export default VideosContext;
