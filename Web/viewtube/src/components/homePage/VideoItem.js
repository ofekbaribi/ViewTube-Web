import React from 'react';
import './VideoItem.css';

function VideoItem({ id, title, description, author, views, date, duration, imgURL, videoURL }) {
  return (
    <div className="video-item">
      <div className="video-thumbnail">
        <img src={imgURL} alt="video thumbnail" />
        <div className="duration">{duration}</div>
      </div>
      <div className="video-details">
        <h3>{title}</h3>
        <p className="author">{author}</p>
        <p className="views">{views} views • {date}</p>
        <a href={videoURL} className="watch-btn">Watch</a>
      </div>
    </div>
  );
}

export default VideoItem;
