import React, { useState } from 'react';
import eyeIcon from '../../assets/eye.svg'; // Import eye icon for showing password
import eyeSlashIcon from '../../assets/eye-slash.svg'; // Import eye slash icon for hiding password
import './EditOptionsModal.css'; // Import custom CSS for styling

const DeleteAccountModal = ({ setPassword, setConfirmPassword, passwordError, setPasswordError }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  // Handler for changing the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update password state
    if (passwordError) {
      setPasswordError(''); // Clear password error if exists
    }
  };

  // Handler for changing the confirm password input
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Update confirm password state
    if (passwordError) {
      setPasswordError(''); // Clear password error if exists
    }
  };

  // Toggle visibility of password input
  const handleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  // Toggle visibility of confirm password input
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility state
  };

  return (
    <>
      {/* Input for password */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            className={`form-control ${passwordError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if passwordError exists
            id="newPassword"
            placeholder="Enter new password"
            onChange={handlePasswordChange}
            required
          />
          <div className="input-group-append">
            {/* Button to toggle password visibility */}
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

      {/* Input for confirm password */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
            className={`form-control ${passwordError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if passwordError exists
            id="confirmNewPassword"
            placeholder="Confirm new password"
            onChange={handleConfirmPasswordChange}
            required
          />
          <div className="input-group-append">
            {/* Button to toggle confirm password visibility */}
            <button
              type="button"
              className="btn btn-outline-secondary btn-new-password-toggle"
              onClick={handleShowConfirmPassword}
              style={{ height: '100%' }}
            >
              <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
            </button>
          </div>
          {/* Display error tooltip if passwordError exists */}
          {passwordError && (
            <div className="invalid-tooltip">
              {passwordError}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
