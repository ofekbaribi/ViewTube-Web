import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import baseVideos from "../../data/db.json";
import SearchResultItem from './SearchResultItem';
import { useLocation } from 'react-router-dom';

function VideoList({ videos }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const baseFilteredVideos = searchQuery 
    ? baseVideos.filter((baseVideo) =>
        baseVideo.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : baseVideos;

    const addedFilteredVideos = searchQuery 
    ? (videos ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) : [])
    : (videos ? videos : []);

    const totalFilteredVideos = [...baseFilteredVideos, ...addedFilteredVideos];

  return (
    <div className={searchQuery ? 'video-list' : 'video-grid'}>
      {totalFilteredVideos.map((filteredVideo) => (
        searchQuery ? <SearchResultItem key={filteredVideo.id} {...filteredVideo} /> : <VideoItem key={filteredVideo.id} {...filteredVideo} />
      ))}
    </div>
  );
}

export default VideoList;
