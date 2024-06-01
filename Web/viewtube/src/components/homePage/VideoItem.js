import React from 'react';
import { Link } from 'react-router-dom';
import './VideoItem.css';

function VideoItem({ id, title, author, views, date, duration, imgURL }) {

  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="videoItem">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
          <p className="card-text">{views} views • {date}</p>
        </div>
        <div className="thumbnail-container">
          <img src={imgURL} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
      </div>
    </Link>
  );
}

export default VideoItem;