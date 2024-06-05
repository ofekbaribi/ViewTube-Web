import React, { useState } from 'react';
import './CommentsSection.css';
import Profile from '../../assets/profile-circle.jpg'

function CommentsSection() {
  const [comments, setComments] = useState([
    { id: 1, text: 'Great video!', author: 'Ofek' },
    { id: 2, text: 'Very informative.', author: 'Ziv' },
    { id: 3, text: 'I love my mom.', author: 'Yuval' },
  ]);
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    {currentUser ? (setComments([...comments, { id: comments.length + 1, text: newComment, author: currentUser.username }])):
    setComments([...comments, { id: comments.length + 1, text: newComment, author: 'Guest' }])}
    
    setNewComment('');
  };
  

  return (
    <div className="comment-section">
      <div className="comment-header">
        <div className="comment-count">{comments.length} Comments</div>
      </div>
      <div className="comment-input">
      {currentUser ? (<img src={currentUser.image} alt='profile picture' className="rounded-circle profile-image" width="40" height="40" />):
      (<img src={Profile} alt='profile picture' className="rounded-circle profile-image" width="40" height="40" />)}
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
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CommentsSection;
