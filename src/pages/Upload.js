import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/bootstrap.min.css';
import './Upload.css';
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';

const UploadPage = () => {
  const { addVideo } = useVideos(); // Access addVideo function from VideosContext
  const [title, setTitle] = useState(''); // State for video title
  const [description, setDescription] = useState(''); // State for video description
  const [videoFile, setVideoFile] = useState(null); // State for selected video file
  const navigate = useNavigate(); // Navigation hook from React Router
  const { currentUser, logout, verifyTokenBeforeVideoUpload } = useUser(); // Access currentUser, logout function, and token verification from UserContext
  const videoRef = useRef(null); // Reference to video element for thumbnail capture
  const canvasRef = useRef(null); // Reference to canvas element for thumbnail generation

  // Effect to redirect to login page if currentUser is null
  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login page if currentUser is null
    }
  }, [currentUser, navigate]);

  // Function to verify token validity before uploading video
  const checkTokenBeforeUpload = async () => {
    console.log('Verifying token before upload...');
    const user = await verifyTokenBeforeVideoUpload(); // Verify token validity
    if (!user) {
      console.log('Token verification failed, logging out...');
      logout(); // Logout if token is invalid
      navigate('/login'); // Redirect to login page
      return false;
    } else if (user.username !== currentUser.username) {
      alert('User mismatch, logging out...'); // Alert if user mismatch occurs
      logout(); // Logout on user mismatch
      navigate('/login'); // Redirect to login page
      return false;
    } else {
      console.log('Token is valid, proceeding with upload...');
      return true; // Proceed with upload if token is valid
    }
  };

  // Function to handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get selected video file
    setVideoFile(file); // Set videoFile state with selected file

    const videoElement = videoRef.current; // Reference to video element
    videoElement.src = URL.createObjectURL(file); // Set video source from selected file
    videoElement.load(); // Load video element

    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.currentTime = 7; // Capture thumbnail at 7 seconds
    });

    videoElement.addEventListener('seeked', () => {
      const canvas = canvasRef.current; // Reference to canvas element
      const context = canvas.getContext('2d'); // Get 2D context of canvas
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height); // Draw video frame on canvas
    }, { once: true }); // Execute seeked event listener once
  };

  // Function to handle video upload
  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!(await checkTokenBeforeUpload())) {
      return; // Return if token verification fails
    }

    if (!title || !description || !videoFile) {
      alert('Please fill in all fields and wait for the thumbnail to generate.'); // Alert if required fields are missing
      return;
    }

    // Function to get video duration asynchronously
    const getVideoDuration = (file) => {
      return new Promise((resolve) => {
        const video = document.createElement('video'); // Create video element
        video.preload = 'metadata'; // Preload video metadata
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src); // Revoke object URL to release resources
          resolve(video.duration); // Resolve promise with video duration
        };
        video.src = URL.createObjectURL(file); // Set video source from file
      });
    };

    // Function to format video duration
    const formatDuration = (duration) => {
      const hours = Math.floor(duration / 3600); // Calculate hours
      const minutes = Math.floor((duration % 3600) / 60); // Calculate minutes
      const seconds = Math.floor(duration % 60); // Calculate seconds
      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Format as HH:MM:SS if hours exist
      } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Format as MM:SS if hours don't exist
      }
    };

    const durationInSeconds = await getVideoDuration(videoFile); // Get video duration
    const duration = formatDuration(durationInSeconds); // Format video duration

    const canvas = canvasRef.current; // Reference to canvas element
    canvas.toBlob(async (blob) => {
      const formData = new FormData(); // Create FormData object for multipart/form-data
      formData.append('title', title); // Append video title
      formData.append('description', description); // Append video description
      formData.append('videoFile', videoFile); // Append video file
      formData.append('thumbnail', blob, `${videoFile.name.replace(/\.[^/.]+$/, "")}_thumbnail.png`); // Append thumbnail blob
      formData.append('duration', duration); // Append video duration
      formData.append('uploader', currentUser.username); // Append uploader username

      try {
        const response = await axios.post('http://localhost:12345/api/videos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for FormData
          },
        });

        addVideo(response.data); // Add uploaded video to videos context
        alert('Video uploaded successfully.'); // Alert on successful upload
        navigate('/'); // Navigate to home page
      } catch (error) {
        console.error('Error uploading video:', error); // Log error on upload failure
        alert('Error uploading video. Please try again.'); // Alert on upload failure
      }
    }, 'image/png'); // Convert canvas to PNG blob
  };

  return (
    <div className="upload-page">
      <div className="container">
        <h2>Upload Video</h2>
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="videoFile" className="form-label">Video File</label>
            <input
              type="file"
              className="form-control"
              id="videoFile"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Upload</button>
        </form>

        {/* Hidden video element for thumbnail capture */}
        <video ref={videoRef} style={{ display: 'none' }} />
        {/* Hidden canvas element for thumbnail generation */}
        <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default UploadPage;
