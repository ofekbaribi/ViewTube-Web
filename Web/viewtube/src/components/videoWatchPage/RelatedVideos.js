import React, { useState, useEffect } from 'react';
import VideoItem from '../homePage/VideoItem';
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
        <VideoItem {...video} />
      ))} 
    </div>
  );
}

export default RelatedVideos;