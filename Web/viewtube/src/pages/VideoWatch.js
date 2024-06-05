import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../data/videoService';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import './VideoWatch.css';
import Sidebar from '../components/commonComponents/Sidebar';

function VideoWatch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const videoData = await fetchVideoDetails(videoId);
        if (!videoData) {
          throw new Error('Video not found');
        }
        setVideo(videoData);
      } catch (err) {
        setError('Failed to fetch video details');
      }
    };

    getVideoDetails();
  }, [videoId]); // Depend on videoId

  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div><Navbar toggleSidebar={toggleSidebar} /></div>
      <Sidebar isOpen={sidebarOpen} />
      <div className="videoMain-container">
        <VideoPlayer videoUrl={video.videoURL} />
        <VideoDetails video={video} />
        <CommentsSection />
      </div>
      <div className="relatedVideosBar">
        <RelatedVideos />
      </div>
    </div>
  );
}

export default VideoWatch;