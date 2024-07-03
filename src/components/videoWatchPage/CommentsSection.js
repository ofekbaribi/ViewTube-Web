import React, {  useState, useEffect } from 'react';
import './CommentsSection.css'; // Import CSS for styling
import axios from 'axios';
import Profile from '../../assets/profile-circle.jpg';
import editIcon from '../../assets/edit_icon.svg';
import deleteIcon from '../../assets/delete_icon.svg';
import saveIcon from '../../assets/tick_icon.svg';
import cancelIcon from '../../assets/cancel_icon.svg';
import { useComments } from '../../contexts/CommentsContext';
import { useUser } from '../../contexts/UserContext';

function CommentsSection({ videoId }) {
  // Context hooks to manage comments and user data
  const {addComment, updateComment, deleteComment} = useComments();
  const { currentUser } = useUser();

  // State variables
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [error, setError] = useState(null);

  const getCommentsByVideoId = async (videoId) => {
    try {
      const response = await axios.get('http://localhost:12345/api/comments/video/' + videoId); 
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setError('Failed to fetch comments');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to fetch comments');
    }
  };

  // Fetch comments when component mounts and when videoId changes
  useEffect(() => {
    getCommentsByVideoId(videoId);
  }, [videoId]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      id: Math.floor(Math.random() * 1000), // to change
      text: newComment,
      uploader: currentUser ? currentUser.username : 'Guest',
      videoId: videoId
    };
    await addComment(comment);
    setNewComment('');
    getCommentsByVideoId(videoId)

  };


  // Handle comment edit initiation
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  // Handle saving edited comment
  const handleSaveEdit = (id) => {
    if (editCommentText === '') {
      deleteComment(id, videoId);
      getCommentsByVideoId(videoId);
    } else {
      updateComment(id, editCommentText, videoId);
      getCommentsByVideoId(videoId);
    }
    setEditingCommentId(null);
    setEditCommentText('');
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };
  
  const handleCommentDelete = (id) => {
    deleteComment(id, videoId);
    getCommentsByVideoId(videoId);
  }

  return (
    <div className="comment-section">
      <div className="comment-header">
        <div className="comment-count">{comments.length} Comments</div>
      </div>
      <div className="comment-input">
        {/* Display current user's profile image or a default image */}
        {currentUser ? (
          <img src={currentUser.image} alt="profile" className="rounded-circle profile-image" width="40" height="40" />
        ) : (
          <img src={Profile} alt="profile" className="rounded-circle profile-image" width="40" height="40" />
        )}
        {/* Input for adding a new comment */}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="input-box"
        />
        <button type="submit" className="submit-button" onClick={handleCommentSubmit}>Submit</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {editingCommentId === comment.id ? (
              <>
                <div className="comment-text">
                  <strong>{comment.uploader}</strong>:
                </div>
                {/* Input for editing a comment */}
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="edit-input"
                />
                <div className="comment-actions">
                  <button className="save-button action-button" onClick={() => handleSaveEdit(comment.id)}>
                    <img src={saveIcon} alt="Save" width="16" height="16"/>
                  </button>
                  <button className="cancel-button action-button" onClick={handleCancelEdit}>
                    <img src={cancelIcon} alt="Cancel" width="16" height="16"/>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="comment-text">
                  <strong>{comment.uploader}</strong>: {comment.text}
                </div>
                <div className="comment-actions">
                  {currentUser && currentUser.username === comment.uploader && (
                    <>
                      <button className="edit-button action-button" onClick={() => handleEditComment(comment)}>
                        <img src={editIcon} alt="Edit" width="16" height="16"/>
                      </button>
                      <button className="delete-button action-button" onClick={() => handleCommentDelete(comment.id, videoId)}>
                        <img src={deleteIcon} alt="Delete" width="16" height="16"/>
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsSection;
