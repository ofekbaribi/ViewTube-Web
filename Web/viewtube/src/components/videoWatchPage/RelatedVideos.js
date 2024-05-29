import React from 'react';
import styles from './RelatedVideos.css';

function RelatedVideos () {
  const relatedVideos = [
    { id: 1, title: 'Related Video 1' },
    { id: 2, title: 'Related Video 2' },
    // Add more related video data here
  ];

  return (
    <div className={styles.relatedVideos}>
      <h3>Related Videos</h3>
      <ul>
        {relatedVideos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedVideos;