import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import './DeleteUserModal.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { useVideos } from '../../contexts/VideosContext';

const DeleteUserModal = ({ show, handleClose }) => {
    const { deleteUser, currentUser } = useUser();
    const { removeUserVideos } = useVideos();
    const navigate = useNavigate();

  
  const handleDeleteUser = async () => {
    try {
      const deletedUser = await deleteUser(currentUser.username);
      if (deletedUser) {
        alert('User deleted successfully');
        removeUserVideos(currentUser.username);
        handleClose(); 
        navigate ('/'); 
      } else {
        alert('Failed to delete user. Please try again later.');
      }
    } catch (error) {
      alert(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your account? This action is irreversible.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
