import React from 'react';
import VideoItem from '../homePage/VideoItem';
import videos from "../../data/db.json";
import { useState } from 'react';
import './RelatedVideos.css';

function RelatedVideos () {

  const [videosList, setVideosList] = useState(videos);

  return (
    <div className="relatedVideos1">
        {videosList.map((video) => (
          <VideoItem {...video} />
        ))}  
    </div>
  );
};

export default RelatedVideos;



