import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import videos from "../../data/db.json";
import SearchResultItem from './SearchResultItem';
import { useLocation } from 'react-router-dom';

function VideoList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const filteredVideos = searchQuery 
    ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;

  return (
    <div className={searchQuery ? 'video-list' : 'video-grid'}>
      {filteredVideos.map((video) => (
        searchQuery ? <SearchResultItem key={video.id} {...video} /> : <VideoItem key={video.id} {...video} />
      ))}
    </div>
  );
}

export default VideoList;
