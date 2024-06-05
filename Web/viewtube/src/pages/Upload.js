import React, { useState } from 'react';
import './Upload.css'; // Add necessary styles

function Upload() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videos, setVideos] = useState([]); // Local state to manage uploaded videos

  const handleUpload = (e) => {
    e.preventDefault();
    const newVideo = {
      id: videos.length + 1,
      title,
      author,
      videoURL: URL.createObjectURL(videoFile),
      imgURL: URL.createObjectURL(thumbnailFile),
      views: 0,
      date: new Date().toLocaleDateString(),
      duration: '0:00' // Placeholder duration
    };

    setVideos([...videos, newVideo]);

    // Clear form fields
    setTitle('');
    setAuthor('');
    setVideoFile(null);
    setThumbnailFile(null);
  };

  return (
    <div className="upload-page">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Video File:</label>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
        </div>
        <div>
          <label>Thumbnail File:</label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} required />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div className="uploaded-videos">
        {videos.map((video) => (
          <div key={video.id} className="uploaded-video">
            <video src={video.videoURL} controls />
            <img src={video.imgURL} alt="thumbnail" />
            <h3>{video.title}</h3>
            <p>{video.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upload;