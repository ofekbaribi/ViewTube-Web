import React, { useState } from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import './EditOptionsModal.css'; // Import custom CSS for styling
import eyeIcon from '../../assets/eye.svg'; // Import eye icon for showing password
import eyeSlashIcon from '../../assets/eye-slash.svg'; // Import eye slash icon for hiding password

const NewPasswordForm = ({ setNewPassword, setConfirmNewPassword, newPasswordError, setNewPasswordError }) => {
  const [showCurrnetPassword, setShowCurrnetPassword] = useState(false); // State to toggle current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  // Handler for changing the new password input
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value); // Update new password state
    if (newPasswordError) {
      setNewPasswordError(''); // Clear new password error if exists
    }
  };

  // Handler for changing the confirm new password input
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value); // Update confirm new password state
    if (newPasswordError) {
      setNewPasswordError(''); // Clear new password error if exists
    }
  };

  // Toggle visibility of current password input
  const handleShowCurrentPassword = () => {
    setShowCurrnetPassword(!showCurrnetPassword); // Toggle current password visibility state
  };

  // Toggle visibility of new password input
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword); // Toggle new password visibility state
  };

  // Toggle visibility of confirm password input
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility state
  };

  return (
    <>
      {/* Input for current password */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showCurrnetPassword ? "text" : "password"} // Toggle input type based on showCurrnetPassword state
            className='form-control'
            id="currentPassword"
            placeholder="Enter current password"
            required
          />
          <div className="input-group-append">
            {/* Button to toggle current password visibility */}
            <button
              type="button"
              className="btn btn-outline-secondary btn-new-password-toggle"
              onClick={handleShowCurrentPassword}
              style={{ height: '100%' }}
            >
              <img src={showCurrnetPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Input for new password */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showNewPassword ? "text" : "password"} // Toggle input type based on showNewPassword state
            className={`form-control ${newPasswordError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if newPasswordError exists
            id="newPassword"
            placeholder="Enter new password"
            onChange={handleNewPasswordChange}
            required
          />
          <div className="input-group-append">
            {/* Button to toggle new password visibility */}
            <button
              type="button"
              className="btn btn-outline-secondary btn-new-password-toggle"
              onClick={handleShowNewPassword}
              style={{ height: '100%' }}
            >
              <img src={showNewPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ height: '1em' }} />
            </button>
          </div>
          {/* Display error tooltip if newPasswordError exists */}
          {newPasswordError && (
            <div className="invalid-tooltip">
              {newPasswordError}
            </div>
          )}
        </div>
      </div>

      {/* Input for confirming new password */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
            className={`form-control ${newPasswordError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if newPasswordError exists
            id="confirmNewPassword"
            placeholder="Confirm new password"
            onChange={handleConfirmNewPasswordChange}
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
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
