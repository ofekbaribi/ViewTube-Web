import React, { useState } from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for stylingimport './editOptionsModal.css';
import './editOptionsModal.css';
import eyeIcon from '../../assets/eye.svg'; // Import eye icon for showing password
import eyeSlashIcon from '../../assets/eye-slash.svg'; // Import eye slash icon for hiding password

const NewPasswordForm = ({ setNewPassword, setConfirmNewPassword, newPasswordError, setNewPasswordError }) => {
  const [showCurrnetPassword, setShowCurrnetPassword] = useState(false); // State to toggle password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (newPasswordError) {
      setNewPasswordError('');
    }
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (newPasswordError) {
      setNewPasswordError('');
    }
  };

  const handleShowCurrentPassword = () => {
    setShowCurrnetPassword(!showCurrnetPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <>
    <div className="mb-3">
        <div className="input-group">
            <input
                type={showCurrnetPassword ? "text" : "password"}
                className='form-control'
                id="currentPassword"
                placeholder="Enter current password"
                required />
            <div className="input-group-append">
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
    </div><div className="mb-3">
            <div className="input-group">
                <input
                    type={showNewPassword ? "text" : "password"}
                    className={`form-control ${newPasswordError ? 'is-invalid' : ''}`}
                    id="newPassword"
                    placeholder="Enter new password"
                    onChange={handleNewPasswordChange}
                    required />
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
        </div><div className="mb-3">
            <div className="input-group">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${newPasswordError ? 'is-invalid' : ''}`}
                    id="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={handleConfirmNewPasswordChange}
                    required />
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
            </div>
        </div>
    </>
  );
};

export default NewPasswordForm;
