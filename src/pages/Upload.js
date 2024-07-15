import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/bootstrap.min.css';
import './Upload.css';
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';

const UploadPage = () => {
  const { addVideo } = useVideos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const { currentUser, logout, verifyTokenBeforeVideoUpload } = useUser();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login page if currentUser is null
    }
  }, [currentUser, navigate]);

  const checkTokenBeforeUpload = async () => {
    console.log('Verifying token before upload...');
    const user = await verifyTokenBeforeVideoUpload();
    if (!user) {
      console.log('Token verification failed, logging out...');
      logout();
      navigate('/login');
      return false;
    } else if (user.username !== currentUser.username) {
      alert('User mismatch, logging out...');
      logout();
      navigate('/login');
      return false;
    } else {
      console.log('Token is valid, proceeding with upload...');
      return true;
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    const videoElement = videoRef.current;
    videoElement.src = URL.createObjectURL(file);
    videoElement.load();

    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.currentTime = 7; // Capture thumbnail at 7 seconds
    });

    videoElement.addEventListener('seeked', () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }, { once: true });
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!(await checkTokenBeforeUpload())) {
      return;
    }

    if (!title || !description || !videoFile) {
      alert('Please fill in all fields and wait for the thumbnail to generate.');
      return;
    }

    const getVideoDuration = (file) => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          resolve(video.duration);
        };
        video.src = URL.createObjectURL(file);
      });
    };

    const formatDuration = (duration) => {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    };

    const durationInSeconds = await getVideoDuration(videoFile);
    const duration = formatDuration(durationInSeconds);

    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('videoFile', videoFile);
      formData.append('thumbnail', blob, `${videoFile.name.replace(/\.[^/.]+$/, "")}_thumbnail.png`); // Append the Blob object
      formData.append('duration', duration);
      formData.append('uploader', currentUser.username);

      try {
        const response = await axios.post('http://localhost:12345/api/videos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        addVideo(response.data);
        alert('Video uploaded successfully.');
        navigate('/');
      } catch (error) {
        console.error('Error uploading video:', error);
        alert('Error uploading video. Please try again.');
      }
    }, 'image/png');
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

        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default UploadPage;
