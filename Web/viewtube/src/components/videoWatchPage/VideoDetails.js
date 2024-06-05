import React from 'react';
import './VideoDetails.css';
import VideoOptionsBar from './VideoOptionsBar';

function VideoDetails({ video }) {
  return (
    <div>
      <div className='video-title'>
        <p>{video.title}</p>
      </div>
      <VideoOptionsBar video={video} />
      <div className='video-description'>
        <p>{video.description}</p>
      </div>
    </div>
  );
}

export default VideoDetails;