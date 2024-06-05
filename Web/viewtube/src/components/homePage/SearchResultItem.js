// SearchResultItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultItem.css'; // Import the CSS file for SearchResultItem

function SearchResultItem({ id, title, author, views, date, duration, imgURL }) {
  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="search-result-item"> {/* Ensure class name matches */}
        <div className="thumbnail-container"> {/* Ensure class name matches */}
          <img src={imgURL} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="video-info"> {/* Ensure class name matches */}
          <div className="video-details"> {/* Ensure class name matches */}
            <h3 className="title">{title}</h3>
            <p className="author">{author}</p>
            <p className="metadata">{views} views • {date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
