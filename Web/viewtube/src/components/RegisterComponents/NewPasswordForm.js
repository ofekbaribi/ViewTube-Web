// src/components/RegisterComponents/NewPasswordForm.js
import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';
import './NewPasswordForm.css';
import eyeIcon from '../../assets/eye.svg';
import eyeSlashIcon from '../../assets/eye-slash.svg';

const NewPasswordForm = ({ password, setPassword, confirmPassword, setConfirmPassword, handlePasswordSubmit, error, setError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="position-relative">
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control input-center ${error ? 'is-invalid' : ''}`}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ width: '1em', height: '1em' }} />
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`form-control input-center ${error ? 'is-invalid' : ''}`}
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowConfirmPassword}
            >
              <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ width: '1em', height: '1em' }} />
            </button>
          </div>
        </div>
        {error && (
          <div className="invalid-tooltip">
            {error}
          </div>
        )}
        <div id="passwordReq">
          <a className='passwordReq' target="_blank" draggable="false" data-tooltip='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'>
            ???
          </a>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default NewPasswordForm;
