import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import './RelatedVideoItem.css'; // Import CSS for styling

function RelatedVideoItem({ id, title, uploader, views, date, thumbnail, duration }) {
  return (
    // Link to navigate to the video details page
    <Link to={`/${uploader}/video/${id}`} className="no-link-style">
      <div className="relatedVideoItem">
        {/* Container for the video thumbnail */}
        <div className="thumbnail-container">
          <img src={thumbnail} alt="video thumbnail" /> {/* Image for video thumbnail */}
          <span className="video-duration">{duration}</span> {/* Display video duration */}
        </div>
        {/* Container for video details */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5> {/* Video title */}
          <p className="card-text">{uploader}</p> {/* Uploader's name */}
          <p className="card-text">{views} views • {date}</p> {/* Views and upload date */}
        </div>
      </div>
    </Link>
  );
}

export default RelatedVideoItem;
