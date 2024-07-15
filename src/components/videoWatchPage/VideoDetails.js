import React, { useState, useEffect } from 'react';
import './VideoDetails.css';
import '../../css/bootstrap.min.css';
import VideoOptionsBar from './VideoOptionsBar';
import editIcon from '../../assets/edit_icon.svg';
import saveIcon from '../../assets/tick_icon.svg';
import cancelIcon from '../../assets/cancel_icon.svg';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';
import { useNavigate } from 'react-router-dom';

function VideoDetails({ video }) {
  const { currentUser } = useUser();
  const { updateVideoDetails, deleteVideo } = useVideos();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(video.title);
  const [newDescription, setNewDescription] = useState(video.description);
  const [currentVideo, setCurrentVideo] = useState(video);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentVideo(video);
  }, [video]);

  useEffect(() => {
    setNewTitle(currentVideo.title);
    setNewDescription(currentVideo.description);
  }, [currentVideo]);

  const handleEditTitleClick = () => setEditingTitle(true);
  const handleSaveTitleClick = async () => {
    if (newTitle === '') {
      alert('Video title cannot be empty!');
    } else {
      setCurrentVideo(await updateVideoDetails(currentUser, video.id, { title: newTitle, description: newDescription }));
      setEditingTitle(false);
    }
  };
  const handleCancelTitleClick = () => {
    setNewTitle(video.title);
    setEditingTitle(false);
  };

  const handleEditDescriptionClick = () => setEditingDescription(true);
  const handleSaveDescriptionClick = async () => {
    if (newDescription === '') {
      alert('Video description cannot be empty!');
    } else {
      setCurrentVideo(await updateVideoDetails(currentUser, video.id, { title: newTitle, description: newDescription }));
      setEditingDescription(false);
    }
  };
  const handleCancelDescriptionClick = () => {
    setNewDescription(video.description);
    setEditingDescription(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(currentUser, video.id);
      navigate('/');
    }
  };

  return (
    <div>
      <div className='video-title'>
        {currentUser && currentUser.username === video.uploader ? (
          <>
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
      
      <VideoOptionsBar video={currentVideo} />
      
      <div className='video-description'>
        {currentUser && currentUser.username === video.uploader ? (
          <>
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
              </p></>
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
          <><div>
                <h6 className='position-absolute top-0 start-0 video-page-views'>{currentVideo.views} Views</h6>
          </div>
          <p className='video-description-text'>{currentVideo.description}</p></>
        )}
      </div>

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
