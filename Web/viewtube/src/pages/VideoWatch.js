import React from 'react';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import styles from './VideoWatch.css';

function VideoWatch (){
  return (
    
    <div className={styles.videoWatchPage}>
      <div className={styles.videoMain}>
      <h2>the first video</h2>
        <VideoPlayer />
        <VideoDetails />
        <CommentsSection />
      </div>
      <div className={styles.relatedVideos}>
        <RelatedVideos />
      </div>
    </div>
  );
};

export default VideoWatch;


