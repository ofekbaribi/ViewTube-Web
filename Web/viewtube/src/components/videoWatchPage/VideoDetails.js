import React from 'react';
import styles from './VideoDetails.css';

function VideoDetails () {
  return (
    <div className={styles.videoDetails}>
      <h2>the first video</h2>
      <p>Description of the video goes here. This section can include the upload date and any other relevant information about the video.</p>
    </div>
  );
};

export default VideoDetails;