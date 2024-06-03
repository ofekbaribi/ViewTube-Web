// src/components/Login.js
import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import './Login.css'; // Ensure this path is correct
import UsernameForm from '../components/LoginComponents/UsernameForm';
import PasswordForm from '../components/LoginComponents/PasswordForm';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError('Please fill out this field.');
    } else {
      setUsernameError('');
      setIsUsernameSubmitted(true);
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
  };
  
  const clearPasswordError = () => {
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container">
        <h2>Sign in</h2>
        <h1> continue to ViewTube</h1>
        {!isUsernameSubmitted ? (
          <UsernameForm
            username={username}
            setUsername={setUsername}
            handleUsernameSubmit={handleUsernameSubmit}
            usernameError={usernameError}
          />
        ) : (
          <PasswordForm
            password={password}
            setPassword={setPassword}
            handlePasswordSubmit={handlePasswordSubmit}
            passwordError={passwordError}
            clearPasswordError={clearPasswordError}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
