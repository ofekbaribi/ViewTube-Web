import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVideos } from '../contexts/VideosContext';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import './VideoWatch.css';

function VideoWatch() {
  // State variables
  const { videoId } = useParams(); // Getting videoId from URL params
  const { username } = useParams(); // Getting username from URL params
  const { addViewCount } = useVideos(); // Using addViewCount function from VideosContext
  const [video, setVideo] = useState(null); // State for the current video
  const [error, setError] = useState(null); // State for error handling
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const navigate = useNavigate(); // Navigation hook from React Router

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Effect to fetch video details based on videoId
  useEffect(() => {
    const fetchVideo = async () => {
      console.log('http://localhost:12345/api/users/' + username + '/videos/' + videoId);
      try {
        const response = await fetch(`http://localhost:12345/api/users/${username}/videos/${videoId}`); 
        if (!response.ok) {
          console.error('Video not found');
        }
        const data = await response.json();
        await addViewCount(data.id); // Increment view count for the video
        setVideo(data);  
      } catch (error) {
        console.error('Error fetching video:', error);
        setError(error.message);
      }
    };

    fetchVideo();
  }, [videoId]); // Update the dependency array to [videoId]

  // Effect to scroll to top when videoId changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on videoId change
  }, [videoId]);

  // Handle search function
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
    navigate(`/?search=${query}`); // Navigate to search results with query parameter
  };

  // Render error state if video is not found
  if (error) {
    return <div>{error}</div>;
  }

  // Render loading state if video is still being fetched
  if (!video) {
    return <div>Loading...</div>;
  }

  // Render video watch page with components
  return (
    <div>
      {/* Navbar component with sidebar toggle and search functionality */}
      <Navbar toggleSidebar={toggleSidebar} onSearch={handleSearch} />
      {/* Sidebar component */}
      <Sidebar isOpen={sidebarOpen} />
      {/* Main container for video details */}
      <div className="videoMain-container">
        {/* VideoPlayer component displaying the video */}
        <VideoPlayer videoUrl={video.videoUrl} />
        {/* VideoDetails component displaying details about the video */}
        <VideoDetails video={video} />
        {/* CommentsSection component for displaying and adding comments */}
        <CommentsSection videoId={video.id} />
      </div>
      {/* RelatedVideos component displaying videos related to the current video */}
      <div className="relatedVideosBar">
        <RelatedVideos/>
      </div>
    </div>
  );
}

export default VideoWatch;
