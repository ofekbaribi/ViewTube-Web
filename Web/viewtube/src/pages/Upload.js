// src/pages/UploadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Upload.css';
import useVideo from '../contexts/VideosContext';

const UploadPage = ({ videos, addVideo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!title || !description || !videoFile) {
      alert('Please fill in all fields.');
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

    const id = (videos ? (videos.length + 11) : 11);
    const duration = await getVideoDuration (videoFile);
    const metadata = {
      id,
      title,
      description,
      videoURL: URL.createObjectURL(videoFile),
      date: new Date().toLocaleDateString(),
      views: 0,
      likes: 0,
      duration
    };

    addVideo(metadata);
    alert('Video uploaded successfully.');
    navigate('/');
  };

  return (
    <div className="upload-page">
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
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
