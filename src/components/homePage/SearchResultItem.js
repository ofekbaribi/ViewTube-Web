import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultItem.css'; // Import the CSS file for SearchResultItem

function SearchResultItem({ id, title, uploader, views, date, thumbnail, duration }) {
  return (
    <Link to={`/${uploader}/video/${id}`} className="no-link-style">
      <div className="search-result-item">
        {/* Container for video thumbnail */}
        <div className="thumbnail-container-search">
          <img src={thumbnail} alt="video thumbnail" /> {/* Display thumbnail image */}
        </div>
        {/* Container for video information */}
        <div className="video-info">
          <div className="video-details">
            <h3 className="title">{title}</h3> {/* Title of the video */}
            <p className="author">{uploader}</p> {/* Uploader of the video */}
            {/* Display metadata: views, date, and duration */}
            <p className="metadata">{views} views • {date} • Duration: {duration}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
