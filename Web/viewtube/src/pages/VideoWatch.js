import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../data/videoService';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import './VideoWatch.css';

function VideoWatch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const videoData = await fetchVideoDetails(videoId);
        if (!videoData) {
          throw new Error('Video not found');
        }
        console.log('Fetched video data:', videoData); // Debugging
        setVideo(videoData);
      } catch (err) {
        console.error('Failed to fetch video details:', err); // Debugging
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
      <Navbar />
      <div className="relatedVideosBar">
        <RelatedVideos />
      </div>
      <div className="videoMain">
        <VideoPlayer videoUrl={video.videoURL} />
        <VideoDetails video={video} />
        <CommentsSection />
      </div>
    </div>
  );
}

export default VideoWatch;