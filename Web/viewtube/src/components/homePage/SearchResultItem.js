// SearchResultItem.js
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultItem.css'; // Import the CSS file for SearchResultItem

function SearchResultItem({ id, title, author, views, date, duration, videoURL }) {
  const [thumbnail, setThumbnail] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoURL) {
      captureThumbnail();
    }
  }, [videoURL]);

  const captureThumbnail = () => {
    const video = document.createElement('video');
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    video.src = videoURL;
    video.crossOrigin = 'anonymous'; // Allow cross-origin resource sharing if needed
    video.load();
    video.currentTime = 7; // Set the time to capture the thumbnail


    video.addEventListener('seeked', function () {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      setThumbnail(dataURL); // Set the thumbnail data URL as the image source
    }, { once: true });
  };

  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="search-result-item"> {/* Ensure class name matches */}
        <div className="thumbnail-container"> {/* Ensure class name matches */}
          <img src={thumbnail} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="video-info"> {/* Ensure class name matches */}
          <div className="video-details"> {/* Ensure class name matches */}
            <h3 className="title">{title}</h3>
            <p className="author">{author}</p>
            <p className="metadata">{views} views • {date}</p>
            <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
