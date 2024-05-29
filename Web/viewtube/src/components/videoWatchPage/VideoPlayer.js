import React from 'react';
import styles from './VideoPlayer.css';
import videoFile from './omeradam.mp4';

function VideoPlayer() {
  return (
    <div className={styles.videoPlayer}>
      <video controls>
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;