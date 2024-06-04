import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import './Login.css'; // Ensure this path is correct
import UsernameForm from '../components/LoginComponents/UsernameForm';
import PasswordForm from '../components/LoginComponents/PasswordForm';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    if (!username) {
      setUsernameError('Please fill out this field.');
    } else if(!users.find(user => username)) {
      setUsernameError('User name does not exist!');
    } else {
      setUsernameError('');
      setIsUsernameSubmitted(true);
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      alert('Login successful');
    } else {
      setPasswordError('Invalid username or password.');
    }
  };
  
  const clearPasswordError = () => {
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <div className='login-page'>
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
              setUsernameError={setUsernameError}
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
          <br/>
          <label htmlFor="member" className="form-label">New here?</label>
          <br/>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
