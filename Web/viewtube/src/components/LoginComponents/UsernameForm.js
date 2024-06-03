import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const UsernameForm = ({ username, setUsername, handleUsernameSubmit, usernameError }) => {
  return (
    <form onSubmit={handleUsernameSubmit} className="position-relative">
      <div className="mb-3">
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
    </form>
  );
};

export default UsernameForm;
