import React from 'react';
import '../../css/bootstrap.min.css';
import './VideoItem.css';  // Ensure this path is correct


function VideoItem({ id, title, description, author, views, date, duration, imgURL, videoURL }) {
  return (
    <div className="videoItem">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{author}</p>
        <p className="card-text">{views} views • {date}</p>
        <p className="card-text">{duration}</p>
        <a href={videoURL} className="btn btn-primary">Watch</a>
      </div>
      <img src={imgURL} alt="video thumbnail" />
    </div>
  );
}

export default VideoItem;