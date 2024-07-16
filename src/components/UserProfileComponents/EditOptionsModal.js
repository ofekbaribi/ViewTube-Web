// src/components/UserProfileComponents/EditOptionsModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeUserDataModal from './ChangeUserDataModal';
import DeleteAccountModal from './DeleteAccountModal';
import ChangeImageModal from './ChangeImageModal';

const EditOptionsModal = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected option ('userData', 'password', 'delete')
  const { currentUser, updateUserData, updateUserPassword, deleteUser } = useUser(); // Destructure user context methods and state
  const [newPasswordError, setNewPasswordError] = useState(''); // State for new password error message
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State for confirming new password
  const [firstName, setFirstName] = useState(currentUser.firstName); // State for first name
  const [lastName, setLastName] = useState(currentUser.lastName); // State for last name
  const [nameError, setNameError] = useState(''); // State for name error message
  const [password, setPassword] = useState(''); // State for current password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming current password
  const [passwordError, setPasswordError] = useState(''); // State for password error message
  const [image, setImage] = useState(''); // State for the image file
  const [imagePreview, setImagePreview] = useState(currentUser.image); // State for the image preview URL
  const navigate = useNavigate(); // Initialize navigation hook
  const { deleteUserVideos } = useVideos(); // Destructure videos context method for deleting user videos

  // Handler for changing the selected option (userData, password, delete)
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setSelectedOption(''); // Reset selected option
    handleClose(); // Call handleClose prop to close the modal
  };

  // Function to validate password complexity
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  // Function to validate name format
  const validateName = (firstName, lastName) => {
    const firstNameHasNumber = /\d/.test(firstName);
    const firstNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(firstName);
    const firstNameValidLength = firstName.length >= 2;

    const lastNameHasNumber = /\d/.test(lastName);
    const lastNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(lastName);
    const lastNameValidLength = lastName.length >= 2;

    return !(firstNameHasNumber || firstNameHasSpecialChar || !firstNameValidLength || lastNameHasNumber || lastNameHasSpecialChar || !lastNameValidLength);
  };

  // Handler for submitting user data changes
  const handleUserDataSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(firstName, lastName)) {
      setNameError('Invalid name format');
      return;
    } else if (currentUser.firstName !== firstName || currentUser.lastName !== lastName || image !== '') {
      const response = await updateUserData(currentUser.username, firstName, lastName, image);
      if (!response) {
        alert('An error occurred. Please try again later.');
        handleCloseModal();
        return;
      }
      alert('User data updated successfully');
      handleCloseModal();
    } else {
      alert('No changes detected');
      handleCloseModal();
    }
  };

  // Function to check if password change submission is valid
  const isPasswordSubmitValid = () => {
    if (newPassword !== confirmNewPassword) {
      setNewPasswordError('Passwords do not match.');
      return false;
    } else if (!validatePassword(newPassword)) {
      setNewPasswordError('Password does not meet requirements.');
      return false;
    } else {
      setNewPasswordError('');
      return true;
    }
  };

  // Handler for submitting password change
  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordSubmitValid()) {
      return;
    } else {
      const response = await updateUserPassword(currentUser.username, event.target.currentPassword.value, newPassword);
      if (response === 401) {
        alert('Incorrect password entered');
        setConfirmNewPassword('');
        setNewPassword('');
      } else if (response === 200) {
        alert('Password changed successfully');
        handleCloseModal();
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  // Handler for deleting user account
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    try {
      const response = await deleteUser(currentUser.username, password);
      const deletedUsername = currentUser.username;
      if (!response) {
        alert('An error occurred. Please try again later.');
        handleCloseModal();
        return;
      }
      if (response.status === 200) {
        alert('User deleted successfully');
        deleteUserVideos(deletedUsername);
        handleCloseModal();
        navigate('/'); // Navigate to home page after successful deletion
      } else if (response.status === 401) {
        setPasswordError('Incorrect password.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error deleting user:', error);
    }
  };

  // Function to render the form based on selected option
  const renderForm = () => {
    switch (selectedOption) {
      case 'userData':
        return (
          <form onSubmit={handleUserDataSubmit}>
            <ChangeUserDataModal
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              nameError={nameError}
              setNameError={setNameError}
            />
            <ChangeImageModal 
              setImage={setImage}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
            />
            <Button variant="primary" type="submit" className='submit-modal-button'>
              Save Changes
            </Button>
          </form>
        );
      case 'password':
        return (
          <form onSubmit={handlePasswordChangeSubmit}>
            <ChangePasswordModal 
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              newPasswordError={newPasswordError}
              setNewPasswordError={setNewPasswordError}
            />
            <Button variant="primary" type="submit" className='submit-modal-button'>
              Change Password
            </Button>
          </form>
        );
      case 'delete':
        return (
          <form onSubmit={handleDeleteAccount}>
            <DeleteAccountModal
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
            <Button variant="danger" type="submit" className='submit-modal-button'>
              Delete Account
            </Button>
          </form>
        );
      default:
        return (
          <div className="options mb-3 d-flex">
            {/* Buttons to select options */}
            <Button variant="outline-primary" className="me-2" onClick={() => handleOptionChange('userData')}>
              Change User Data
            </Button>
            <Button variant="outline-secondary" className='me-2' onClick={() => handleOptionChange('password')}>
              Change Password
            </Button>
            <Button variant="outline-danger" className='me-2' onClick={() => handleOptionChange('delete')}>
              Delete Account
            </Button>
          </div>
        );
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} className='edit-modal'>
      {/* Modal Header */}
      <Modal.Header closeButton className='modal-header'>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      {/* Modal Body */}
      <Modal.Body className='modal-body'>
        {renderForm()} {/* Render form based on selected option */}
      </Modal.Body>
      {/* Modal Footer */}
      <Modal.Footer className='modal-footer'>
        {/* Render return button if an option is selected */}
        {selectedOption ? (
          <Button variant="secondary" onClick={() => setSelectedOption('')}>
            Return
          </Button>
        ) : null}
        {/* Close button */}
        <Button variant="primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOptionsModal;