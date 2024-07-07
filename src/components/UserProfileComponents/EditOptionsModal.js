import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeUserDataModal from './ChangeUserDataModal';

const EditOptionsModal = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const { currentUser, updateUserData, updateUserPassword } = useUser();
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [nameError, setNameError] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    setSelectedOption('');
    handleClose();
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  const validateName = (firstName, lastName) => {
    const firstNameHasNumber = /\d/.test(firstName);
    const firstNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(firstName);
    const firstNameValidLength = firstName.length >= 2;

    const lastNameHasNumber = /\d/.test(lastName);
    const lastNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(lastName);
    const lastNameValidLength = lastName.length >= 2;

    return !(firstNameHasNumber || firstNameHasSpecialChar || !firstNameValidLength || lastNameHasNumber || lastNameHasSpecialChar || !lastNameValidLength);
  };

  const handleUserDataSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(firstName, lastName)) {
      setNameError('Invalid name format');
      return;
    } else if (currentUser.firstName !== firstName || currentUser.lastName !== lastName) {
      const response = await updateUserData(currentUser.username, firstName, lastName);
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
            <Button variant="primary" type="submit">
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
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </form>
        );
      default:
        return (
          <div className="options mb-3">
            <Button variant="outline-primary" className="me-2" onClick={() => handleOptionChange('userData')}>
              Change User Data
            </Button>
            <Button variant="outline-secondary" onClick={() => handleOptionChange('password')}>
              Change Password
            </Button>
          </div>
        );
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        {selectedOption ? (
          <Button variant="secondary" onClick={() => setSelectedOption('')}>
            Return
          </Button>
        ) : null}
        <Button variant="primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOptionsModal;
