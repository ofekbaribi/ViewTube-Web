import React, { useState } from 'react';
import './CommentsSection.css';
import Profile from '../../assets/profile-circle.jpg';
import editIcon from '../../assets/edit_icon.svg';
import deleteIcon from '../../assets/delete_icon.svg';
import saveIcon from '../../assets/tick_icon.svg';
import cancelIcon from '../../assets/cancel_icon.svg';
import { useComments } from '../../contexts/CommentsContext';
import { useUser } from '../../contexts/UserContext';

function CommentsSection({ videoId }) {
  const { comments, addComment, updateComment, deleteComment, getCommentsByVideoId } = useComments();
  const { currentUser } = useUser();
  const videoComments = getCommentsByVideoId(videoId);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: comments.length + 1,
      text: newComment,
      author: currentUser ? currentUser.username : 'Guest',
      videoId,
    };
    addComment(comment);
    setNewComment('');
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const handleSaveEdit = (id) => {
    updateComment(id, editCommentText);
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <div className="comment-count">{videoComments.length} Comments</div>
      </div>
      <div className="comment-input">
        {currentUser ? (
          <img src={currentUser.image} alt="profile picture" className="rounded-circle profile-image" width="40" height="40" />
        ) : (
          <img src={Profile} alt="profile picture" className="rounded-circle profile-image" width="40" height="40" />
        )}
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
        {videoComments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {editingCommentId === comment.id ? (
              <>
                <div className="comment-text">
                  <strong>{comment.author}</strong>:
                </div>
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
                  <strong>{comment.author}</strong>: {comment.text}
                </div>
                <div className="comment-actions">
                  {currentUser && currentUser.username === comment.author && (
                    <>
                      <button className="edit-button action-button" onClick={() => handleEditComment(comment)}>
                        <img src={editIcon} alt="Edit" width="16" height="16"/>
                      </button>
                      <button className="delete-button action-button" onClick={() => deleteComment(comment.id)}>
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
