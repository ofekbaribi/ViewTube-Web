import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import './VideoWatch.css';
import { useVideos } from '../contexts/VideosContext';

function VideoWatch() {
  const { videos } = useVideos();
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const getVideoDetails = () => {
      const videoData = videos.find(video => video.id === parseInt(videoId, 10));
      if (videoData) {
        setVideo(videoData);
      } else {
        setError('Video not found');
      }
    };

    getVideoDetails();
  }, [videoId, videos]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/?search=${query}`);
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
        <CommentsSection videoId={video.id} />
      </div>
      <div className="relatedVideosBar">
        <RelatedVideos searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default VideoWatch;
