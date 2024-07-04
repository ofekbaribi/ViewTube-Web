import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import eyeIcon from '../../assets/eye.svg';
import eyeSlashIcon from '../../assets/eye-slash.svg';
import './editOptionsModal.css';

const EditOptionsModal = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const { currentUser, updateUserData, updateUserPassword } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    setSelectedOption('');
    handleClose();
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (newPasswordError) {
      setNewPasswordError('');
    }
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (confirmNewPasswordError) {
      setConfirmNewPasswordError('');
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (firstNameError) {
      setFirstNameError('');
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (lastNameError) {
      setLastNameError('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      setFirstNameError('Invalid name format');
      setLastNameError('Invalid name format');
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
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                value={firstName} 
                onChange={handleFirstNameChange}
                required
              />
              {firstNameError && (
                <div className="invalid-tooltip">
                  {firstNameError}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                value={lastName} 
                onChange={handleLastNameChange}
                required
              />
              {lastNameError && (
                <div className="invalid-tooltip">
                  {lastNameError}
                </div>
              )}
            </div>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
        );
      case 'password':
        return (
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className='form-control' 
                  id="currentPassword"
                  placeholder="Enter current password" 
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-new-password-toggle"
                    onClick={handleShowPassword}
                    style={{ height: '100%' }}
                  >
                    <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className={`form-control ${newPasswordError ? 'is-invalid' : ''}`}
                  id="newPassword" 
                  placeholder="Enter new password" 
                  onChange={handleNewPasswordChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-new-password-toggle"
                    onClick={handleShowNewPassword}
                    style={{ height: '100%' }}
                  >
                    <img src={showNewPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
                  </button>
                </div>
                {newPasswordError && (
                  <div className="invalid-tooltip">
                    {newPasswordError}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className={`form-control ${confirmNewPasswordError ? 'is-invalid' : ''}`}
                  id="confirmNewPassword" 
                  placeholder="Confirm new password"
                  onChange={handleConfirmNewPasswordChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-new-password-toggle"
                    onClick={handleShowConfirmPassword}
                    style={{ height: '100%' }}
                  >
                    <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
                  </button>
                </div>
                {confirmNewPasswordError && (
                  <div className="invalid-tooltip">
                    {confirmNewPasswordError}
                  </div>
                )}
              </div>
            </div>
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
