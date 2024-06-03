// src/components/RegisterComponents/UsernameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewUsernameForm = ({ username, setUsername, handleUsernameSubmit, error }) => {
  return (
    <form onSubmit={handleUsernameSubmit} className="position-relative">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control input-center ${error ? 'is-invalid' : ''}`}
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {error && (
          <div className="invalid-tooltip">
            {error}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
};

export default NewUsernameForm;
