// src/components/UsernameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../../pages/Register'

const UsernameForm = ({ username, setUsername, handleUsernameSubmit, usernameError }) => {
  return (
    <form onSubmit={handleUsernameSubmit} className="position-relative">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input
          type="username"
          className={`form-control input-center ${usernameError ? 'is-invalid' : ''}`}
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {usernameError && (
          <div className="invalid-tooltip">
            {usernameError}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Next</button>
      <a href="#" className="d-block mt-3">Create account</a>
    </form>
  );
};

export default UsernameForm;
