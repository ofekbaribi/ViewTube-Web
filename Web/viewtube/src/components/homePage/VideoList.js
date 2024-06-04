import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import videos from "../../data/db.json";

function VideoList({ searchQuery }) {
  const filteredVideos = searchQuery 
    ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;

  return (
    <div className="video-grid">
      {filteredVideos.map((video) => (
        <VideoItem key={video.id} {...video} />
      ))}
    </div>
  );
}

export default VideoList;
