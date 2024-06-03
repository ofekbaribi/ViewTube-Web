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

import { Link } from 'react-router-dom';
import './VideoItem.css';

function VideoItem({ id, title, author, views, date, duration, imgURL }) {

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

    <Link to={`/video/${id}`} className="no-link-style">
      <div className="videoItem">
      <div className="thumbnail-container">
          <img src={imgURL} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
          <p className="card-text">{views} views • {date}</p>
        </div>
      </div>

    </Link>
  );
}

export default VideoItem;
