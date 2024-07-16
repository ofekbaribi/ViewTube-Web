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
import { Link } from 'react-router-dom';

function CommentsSection({ videoId }) {
  // Context hooks to manage comments and user data
  const { addComment, updateComment, deleteComment } = useComments();
  const { currentUser } = useUser();

  // State variables
  const [comments, setComments] = useState([]); // State for storing comments
  const [newComment, setNewComment] = useState(''); // State for new comment input
  const [editingCommentId, setEditingCommentId] = useState(null); // State for tracking edited comment ID
  const [editCommentText, setEditCommentText] = useState(''); // State for edited comment text
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch comments by video ID
  const getCommentsByVideoId = async (videoId) => {
    try {
      const response = await axios.get('http://localhost:12345/api/comments/video/' + videoId); // Make GET request to fetch comments
      if (Array.isArray(response.data)) {
        setComments(response.data); // Update comments state with fetched data
      } else {
        setError('Failed to fetch comments'); // Set error message if response data is not an array
      }
    } catch (err) {
      console.error('Error fetching comments:', err); // Log error if fetching comments fails
      setError('Failed to fetch comments'); // Set error message on fetch failure
    }
  };

  // Fetch comments when component mounts and when videoId changes
  useEffect(() => {
    getCommentsByVideoId(videoId); // Call function to fetch comments
  }, [videoId]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const comment = {
      text: newComment,
      uploader: currentUser ? currentUser.username : 'Guest',
      videoId: videoId
    };
    await addComment(comment); // Add new comment using addComment method from context
    setNewComment(''); // Clear new comment input after submission
    getCommentsByVideoId(videoId); // Refresh comments after adding new comment
  };

  // Handle comment edit initiation
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id); // Set editingCommentId state to the ID of the comment being edited
    setEditCommentText(comment.text); // Set editCommentText state to the current text of the comment being edited
  };

  // Handle saving edited comment
  const handleSaveEdit = async (id) => {
    if (editCommentText === '') {
      await deleteComment(id, videoId); // Delete comment if editCommentText is empty
      getCommentsByVideoId(videoId); // Refresh comments after deletion
    } else {
      await updateComment(id, editCommentText, videoId); // Update comment with new text
      getCommentsByVideoId(videoId); // Refresh comments after update
    }
    setEditingCommentId(null); // Reset editingCommentId after saving edit
    setEditCommentText(''); // Clear editCommentText after saving edit
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingCommentId(null); // Reset editingCommentId when edit is canceled
    setEditCommentText(''); // Clear editCommentText when edit is canceled
  };

  // Handle comment delete
  const handleCommentDelete = async (id) => {
    await deleteComment(id, videoId); // Delete comment using deleteComment method from context
    getCommentsByVideoId(videoId); // Refresh comments after deletion
  };

  return (
    <div className="comment-section">
      {/* Comment section header */}
      <div className="comment-header">
        <div className="comment-count">{comments.length} Comments</div>
      </div>
      {/* Comment input area */}
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
        {/* Button to submit new comment */}
        <button type="submit" className="submit-button" onClick={handleCommentSubmit}>Submit</button>
      </div>
      {/* List of comments */}
      <ul>
        {/* Map through comments array to render each comment */}
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {/* Conditional rendering based on whether comment is being edited */}
            {editingCommentId === comment.id ? (
              <>
                {/* Display username and input for editing comment */}
                <div className="comment-text">
                  <strong>{comment.uploader}</strong>:
                </div>
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="edit-input"
                />
                {/* Action buttons for saving or canceling edit */}
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
                {/* Display username, comment text, and action buttons for editing or deleting */}
                <div className="comment-text">
                  {/* Link to user profile */}
                  <Link to={`/profile/${comment.uploader}`} className="no-link-style">
                    <strong>{comment.uploader}</strong>
                  </Link>: {comment.text}
                </div>
                {/* Action buttons for editing and deleting comments */}
                <div className="comment-actions">
                  {currentUser && currentUser.username === comment.uploader && (
                    <>
                      {/* Button to edit comment */}
                      <button className="edit-button action-button" onClick={() => handleEditComment(comment)}>
                        <img src={editIcon} alt="Edit" width="16" height="16"/>
                      </button>
                      {/* Button to delete comment */}
                      <button className="delete-button action-button" onClick={() => handleCommentDelete(comment.id)}>
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