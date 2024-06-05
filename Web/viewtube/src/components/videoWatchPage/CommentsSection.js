import React, { useState } from 'react';
import './CommentsSection.css';

function CommentsSection() {
  const [comments, setComments] = useState([
    { id: 1, text: 'Great video!', author: 'Ofek' },
    { id: 2, text: 'Very informative.', author: 'Ziv' },
    { id: 3, text: 'I love my mom.', author: 'Yuval' },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: comments.length + 1, text: newComment, author: 'CurrentUser' }]);
    setNewComment('');
  };
  

  return (
    <div className="comment-section">
      <div className="comment-header">
        <div className="comment-count">{comments.length} Comments</div>
      </div>
      <div className="comment-input">
        <img src='/media/bibi.jpg' alt="Profile" className="profile-image" />
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
