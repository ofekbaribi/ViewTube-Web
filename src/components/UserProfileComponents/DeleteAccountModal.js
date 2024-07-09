// src/components/UserProfileComponents/DeleteAccountModal.js
import React, { useState } from 'react';
import eyeIcon from '../../assets/eye.svg';
import eyeSlashIcon from '../../assets/eye-slash.svg';
import './EditOptionsModal.css';

const DeleteAccountModal = ({ setPassword, setConfirmPassword, passwordError, setPasswordError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <><div className="mb-3">
          <div className="input-group">
              <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  id="newPassword"
                  placeholder="Enter new password"
                  onChange={handlePasswordChange}
                  required />
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
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={handleConfirmPasswordChange}
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
                {passwordError && (
                <div className="invalid-tooltip">
                    {passwordError}
                </div>
                )}
            </div>
        </div></>
  );
};

export default DeleteAccountModal;
