import React, { useState, useEffect } from 'react';
import RelatedVideoItem from './RelatedVideoItem';
import videos from '../../data/db.json';
import './RelatedVideos.css';

function RelatedVideos() {
  const [videosList, setVideosList] = useState([]);

  useEffect(() => {
    setVideosList(videos); // This sets the videos list from the JSON file
  }, []);

  return (
    <div className="relatedVideos1">
      {videosList.map((video) => (
        <RelatedVideoItem {...video} />
      ))} 
    </div>
  );
}

export default RelatedVideos;