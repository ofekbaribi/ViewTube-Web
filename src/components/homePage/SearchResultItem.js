import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultItem.css'; // Import the CSS file for SearchResultItem
import buffering from '../../assets/loadin-place-holder.png';

function SearchResultItem({ id, title, uploader, views, date, videoUrl }) {
  const [thumbnail, setThumbnail] = useState(buffering);
  const [duration, setDuration] = useState('');
  const canvasRef = useRef(null);

  const captureThumbnail = useCallback(() => {
    const video = document.createElement('video'); // Create a video element
    const canvas = canvasRef.current; // Get the canvas element from the ref
    const context = canvas.getContext('2d'); // Get the 2D drawing context of the canvas

    video.src = videoUrl; // Set the source of the video
    video.crossOrigin = 'anonymous'; // Allow cross-origin resource sharing if needed
    video.load(); // Load the video

    video.addEventListener('loadedmetadata', function () {
      // Calculate and set the video duration once metadata is loaded
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    });

    video.currentTime = 7; // Set the time to capture the thumbnail (7 seconds)

    video.addEventListener('seeked', function () {
      // Draw the video frame onto the canvas when the seek operation completes
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL(); // Convert the canvas content to a data URL
      setThumbnail(dataURL); // Set the thumbnail state to the data URL
    }, { once: true }); // Listen for the event only once
  }, [videoUrl]); // Memoize the function and add videoURL as a dependency

  useEffect(() => {
    if (videoUrl) {
      captureThumbnail(); // Capture thumbnail when videoURL changes
    }
  }, [videoUrl, captureThumbnail]);

  return (
    <Link to={`/video/${id}`} className="no-link-style">
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
            <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas> {/* Hidden canvas for thumbnail capture */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
