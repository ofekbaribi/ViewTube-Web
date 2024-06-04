// src/components/LoginComponents/PasswordForm.js
import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';
import '../RegisterComponents/NewPasswordForm.css'
import eyeIcon from '../../assets/eye.svg';
import eyeSlashIcon from '../../assets/eye-slash.svg';

const PasswordForm = ({ password, setPassword, handlePasswordSubmit, passwordError, setPasswordError }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="position-relative">
      <div className="mb-3">
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control input-center ${passwordError ? 'is-invalid' : ''}`}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary btn-password-toggle"
              onClick={toggleShowPassword}
            >
              <img src={toggleShowPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ width: '1em', height: '1em' }} />
            </button>
          </div>
        </div>
        {passwordError && (
          <div className="invalid-tooltip">
            {passwordError}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default PasswordForm;
