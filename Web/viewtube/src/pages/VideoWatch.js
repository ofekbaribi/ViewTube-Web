import React from 'react';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import './VideoWatch.css';

function VideoWatch (){
  return (
    
    <div>
        <Navbar />
        <div className="relatedVideosBar">
            <RelatedVideos />
        </div>
        
        <div className="videoMain">
            <VideoPlayer />
            <VideoDetails />
            <CommentsSection />
        </div>
    </div>
  );
};

export default VideoWatch;


