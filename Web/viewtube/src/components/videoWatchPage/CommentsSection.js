// src/components/videoWatchPage/CommentsSection.js
import React, { useState } from 'react';
import './CommentsSection.css';
import Profile from '../../assets/profile-circle.jpg';
import { useComments } from '../../contexts/CommentsContext';
import { useUser } from '../../contexts/UserContext';

function CommentsSection({ videoId }) {
  const { comments, addComment, getCommentsByVideoId } = useComments();
  const { currentUser } = useUser();
  const videoComments = getCommentsByVideoId(videoId);
  const [newComment, setNewComment] = useState('');

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
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsSection;
