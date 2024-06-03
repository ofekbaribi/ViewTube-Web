import React from 'react';
import './VideoDetails.css';

function VideoDetails({ video }) {
  return (
    <div className="videoDetails">
      <h1>{video.title}</h1>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoDetails;