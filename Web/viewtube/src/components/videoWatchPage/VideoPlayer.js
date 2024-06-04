import React, { useEffect, useRef } from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);
  
  return (
    <div className="videoPlayer">
      <video controls ref={videoRef} key={videoUrl} autoPlay>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;