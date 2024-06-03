import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import videos from "../../data/db.json";

function VideoList() {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <a href={`video.html?id=${video.id}`} key={video.id} className="video-link">
          <VideoItem {...video} />
        </a>
      ))}
    </div>
  );
}

export default VideoList;
