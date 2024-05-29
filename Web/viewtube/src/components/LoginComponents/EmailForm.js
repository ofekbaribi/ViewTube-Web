// src/components/EmailForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const EmailForm = ({ email, setEmail, handleEmailSubmit, emailError }) => {
  return (
    <form onSubmit={handleEmailSubmit} className="position-relative">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control input-center ${emailError ? 'is-invalid' : ''}`}
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <div className="invalid-tooltip">
            {emailError}
          </div>
        )}
      </div>
      <a href="#" className="d-block mb-3">Forgot email?</a>
      <button type="submit" className="btn btn-primary">Next</button>
      <a href="#" className="d-block mt-3">Create account</a>
    </form>
  );
};

export default EmailForm;
