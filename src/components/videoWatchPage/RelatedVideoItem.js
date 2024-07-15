import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedVideoItem.css';

function RelatedVideoItem({ id, title, uploader, views, date, thumbnail, duration}) {
  return (
    <Link to={`/${uploader}/video/${id}`} className="no-link-style">
      <div className="relatedVideoItem">
        <div className="thumbnail-container">
          <img src={thumbnail} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{uploader}</p>
          <p className="card-text">{views} views • {date}</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedVideoItem;
