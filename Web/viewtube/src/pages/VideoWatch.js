import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { fetchVideoDetails } from '../data/videoService';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import './VideoWatch.css';
import Sidebar from '../components/commonComponents/Sidebar';


function VideoWatch({ videos }) {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        let videoData = await fetchVideoDetails(videoId);
        if (!videoData) {
          videoData = await videos.find(video => video.id === parseInt(videoId, 10));
          if (!videoData) {
            throw new Error('Video not found');
          }
        }
        setVideo(videoData);
      } catch (err) {
          setError('Failed to fetch video details');
      }
    };

    getVideoDetails();
  }, [videoId]); // Depend on videoId

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever videoId changes
  }, [videoId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Redirect to homepage with search query as URL parameter
    window.location.href = `/?search=${query}`;
  };
  
  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return <div>Loading...</div>;
  }

  


  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} onSearch={handleSearch} />
      <Sidebar isOpen={sidebarOpen} />
      <div className="videoMain-container">
        <VideoPlayer videoUrl={video.videoURL} />
        <VideoDetails video={video} />
        <CommentsSection />
      </div>
      <div className="relatedVideosBar">
        <RelatedVideos searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default VideoWatch;
