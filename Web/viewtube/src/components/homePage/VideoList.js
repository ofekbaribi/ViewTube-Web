import React from 'react';
import VideoItem from './VideoItem';
import styles from './VideoList.css';
import videos from "../../data/db.json";
import { useState } from 'react';



// const VideoList = () => {
//   const videos = [
//     { id: 1, title: 'Video 1', description: 'Description for Video 1' },
//     { id: 2, title: 'Video 2', description: 'Description for Video 2' },
//     // Add more video data here
//   ];

function VideoList() {
const [videosList, setVideosList] = useState(videos);
  return (
    <div className={styles.videoList}>
      {videosList.map((video) => (
        <VideoItem key={video.id} {...video} />
      ))}
    </div>
  );
}


export default VideoList;