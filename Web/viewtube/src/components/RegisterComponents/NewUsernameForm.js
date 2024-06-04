// src/components/RegisterComponents/UsernameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewUsernameForm = ({ username, setUsername, usernameError, setUsernameError}) => {
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError('');
    }
  };
  
  return (
    <div className="mb-3">
      <input
        type="text"
        className={`form-control input-center`}
        id="username"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
    </div>
  );
};

export default NewUsernameForm;
