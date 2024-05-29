import React from 'react';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import './VideoWatch.css';

function VideoWatch (){
  return (
    
    <div className="videoWatchPage">
      <div className="videoMain">
      <h2>the first video</h2>
        <VideoPlayer />
        <VideoDetails />
        <CommentsSection />
      </div>
      <div className="relatedVideos">
        <RelatedVideos />
      </div>
    </div>
  );
};

export default VideoWatch;


