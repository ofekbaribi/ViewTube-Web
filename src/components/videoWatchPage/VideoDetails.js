import React, { useState, useEffect } from 'react';
import './VideoDetails.css'; // Import CSS for styling
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS
import VideoOptionsBar from './VideoOptionsBar'; // Import VideoOptionsBar component
import editIcon from '../../assets/edit_icon.svg'; // Import edit icon
import saveIcon from '../../assets/tick_icon.svg'; // Import save icon
import cancelIcon from '../../assets/cancel_icon.svg'; // Import cancel icon
import { useUser } from '../../contexts/UserContext'; // Import useUser hook from context
import { useVideos } from '../../contexts/VideosContext'; // Import useVideos hook from context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function VideoDetails({ video }) {
  const { currentUser } = useUser(); // Access current user from context
  const { updateVideoDetails, deleteVideo } = useVideos(); // Access updateVideoDetails and deleteVideo functions from context
  const [editingTitle, setEditingTitle] = useState(false); // State for editing title mode
  const [editingDescription, setEditingDescription] = useState(false); // State for editing description mode
  const [newTitle, setNewTitle] = useState(video.title); // State for new title
  const [newDescription, setNewDescription] = useState(video.description); // State for new description
  const [currentVideo, setCurrentVideo] = useState(video); // State for current video details
  const navigate = useNavigate(); // Navigation function from react-router-dom

  // Update currentVideo state when the video prop changes
  useEffect(() => {
    setCurrentVideo(video);
  }, [video]);

  // Update newTitle and newDescription when currentVideo changes
  useEffect(() => {
    setNewTitle(currentVideo.title);
    setNewDescription(currentVideo.description);
  }, [currentVideo]);

  // Handle click to initiate title editing
  const handleEditTitleClick = () => setEditingTitle(true);

  // Handle click to save edited title
  const handleSaveTitleClick = async () => {
    if (newTitle === '') {
      alert('Video title cannot be empty!');
    } else {
      setCurrentVideo(await updateVideoDetails(currentUser.username, video.id, { title: newTitle, description: newDescription }));
      setEditingTitle(false);
    }
  };

  // Handle click to cancel title editing
  const handleCancelTitleClick = () => {
    setNewTitle(video.title);
    setEditingTitle(false);
  };

  // Handle click to initiate description editing
  const handleEditDescriptionClick = () => setEditingDescription(true);

  // Handle click to save edited description
  const handleSaveDescriptionClick = async () => {
    if (newDescription === '') {
      alert('Video description cannot be empty!');
    } else {
      setCurrentVideo(await updateVideoDetails(currentUser, video.id, { title: newTitle, description: newDescription }));
      setEditingDescription(false);
    }
  };

  // Handle click to cancel description editing
  const handleCancelDescriptionClick = () => {
    setNewDescription(video.description);
    setEditingDescription(false);
  };

  // Handle click to delete the video
  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(currentUser, video.id);
      navigate('/');
    }
  };

  return (
    <div>
      {/* Video title section */}
      <div className='video-title'>
        {currentUser && currentUser.username === video.uploader ? (
          <>
            {/* Display current title or input for editing */}
            {!editingTitle ? (
              <p>
                {currentVideo.title}
                <button className="edit-button action-button" onClick={handleEditTitleClick}>
                  <img src={editIcon} alt="Edit title" />
                </button>
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Edit title"
                  className='input-box'
                />
                <button className="save-button action-button" onClick={handleSaveTitleClick}>
                  <img src={saveIcon} alt="Save title" />
                </button>
                <button className="cancel-button action-button" onClick={handleCancelTitleClick}>
                  <img src={cancelIcon} alt="Cancel editing title" />
                </button>
              </>
            )}
          </>
        ) : (
          <p>{currentVideo.title}</p>
        )}
      </div>
      
      {/* Render VideoOptionsBar component */}
      <VideoOptionsBar video={currentVideo} />
      
      {/* Video description section */}
      <div className='video-description'>
        {currentUser && currentUser.username === video.uploader ? (
          <>
            {/* Display current description or input for editing */}
            {!editingDescription ? (
              <>
                <div>
                  <h6 className='position-absolute top-0 start-0 video-page-views'>{currentVideo.views} Views</h6>
                </div>
                <p className='video-description-text'>
                  {currentVideo.description}
                  <button className="description-edit-button action-button" onClick={handleEditDescriptionClick}>
                    <img src={editIcon} alt="Edit description" />
                  </button>
                </p>
              </>
            ) : (
              <>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Edit description"
                  className='edit-video-description'
                />
                <button className="description-save-button action-button" onClick={handleSaveDescriptionClick}>
                  <img src={saveIcon} alt="Save description" />
                </button>
                <button className="description-cancel-button action-button" onClick={handleCancelDescriptionClick}>
                  <img src={cancelIcon} alt="Cancel editing description" />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <div>
              <h6 className='position-absolute top-0 start-0 video-page-views'>{currentVideo.views} Views</h6>
            </div>
            <p className='video-description-text'>{currentVideo.description}</p>
          </>
        )}
      </div>

      {/* Display delete button if current user is the video uploader */}
      {currentUser && currentUser.username === video.uploader && (
        <div className="delete-button-container">
          <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
            Delete Video
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
