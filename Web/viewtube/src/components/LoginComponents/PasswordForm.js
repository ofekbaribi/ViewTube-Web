// src/components/LoginComponents/PasswordForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const PasswordForm = ({ password, setPassword, handlePasswordSubmit, passwordError, clearPasswordError }) => {
  return (
    <form onSubmit={handlePasswordSubmit} className="position-relative">
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control input-center ${passwordError ? 'is-invalid' : ''}`}
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearPasswordError();
          }}
          required
        />
        {passwordError && (
          <div className="invalid-tooltip">
            {passwordError}
          </div>
        )}
      </div>
      <a href="#" className="d-block mb-3">Forgot password?</a>
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default PasswordForm;
