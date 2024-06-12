import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import SearchResultItem from './SearchResultItem';
import { useLocation } from 'react-router-dom';

function VideoList({ videos }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

    const filteredVideos = searchQuery 
    ? (videos ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) : [])
    : (videos ? videos : []);

  return (
    <div className={searchQuery ? 'video-list' : 'video-grid'}>
      {filteredVideos.map((filteredVideo) => (
        searchQuery ? <SearchResultItem key={filteredVideo.id} {...filteredVideo} /> : <VideoItem key={filteredVideo.id} {...filteredVideo} />
      ))}
    </div>
  );
}

export default VideoList;