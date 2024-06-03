import React from 'react';
import './VideoItem.css';
import { Link } from 'react-router-dom';

function VideoItem({ id, title, author, views, date, duration, imgURL }) {
  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="video-item">
        <div className="thumbnail-container">
          <img src={imgURL} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="video-info">
          <div className="video-details">
            <h3 className="title">{title}</h3>
            <p className="author">{author}</p>
            <p className="metadata">{views} views • {date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoItem;
