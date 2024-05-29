import React from 'react';
import styles from './VideoItem.css';

function VideoItem({id, title, description}) {
  return (
    <a href={`video.html?id=${id}`}>
    <div className={styles.videoItem}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    </a>
  );
}

export default VideoItem;