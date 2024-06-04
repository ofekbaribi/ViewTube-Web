import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const UsernameForm = ({ username, setUsername, handleUsernameSubmit, usernameError, setUsernameError }) => {

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError('');
    }
  };

  return (
    <form onSubmit={handleUsernameSubmit} className="position-relative">
      <div className="mb-3">
        <input
          type="username"
          className={`form-control input-center ${usernameError ? 'is-invalid' : ''}`}
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
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
