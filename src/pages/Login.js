import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Login.css';
import UsernameForm from '../components/LoginComponents/UsernameForm';
import PasswordForm from '../components/LoginComponents/PasswordForm';
import logo from '../assets/logo.png';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const Login = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Router navigation hook
  const navigate = useNavigate();

  // User context
  const { setUser } = useUser();

  const checkUsernameExistance = async (username) => {
    const response = await axios.get(`http://localhost:12345/api/users/check/${username}`);
    return response.data.exists;
  }

  // Handle form submission when username is submitted
  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError('Please fill out this field.');
    } else {
      const exists = await checkUsernameExistance(username);
      if (!exists) {
        setUsernameError('User name does not exist!');
      } else {
        setUsernameError('');
        setIsUsernameSubmitted(true); // Proceed to password form
      }
    }
  };

  // Handle form submission when password is submitted
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:12345/api/token', { username, password });
      if (response.status === 200) {
        setUser(response.data.user); // Set user context
        localStorage.setItem('jwtToken', response.data.token); // Set the generated JWT
        alert('Login successful'); // Notify user
        navigate('/'); // Redirect to home page
      } else {
        setPasswordError('Invalid username or password.');
      }
    } catch (error) {
      setPasswordError('Invalid username or password.');
    }
  };

  // Clear password error message
  const clearPasswordError = () => {
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <div className='login-page'>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          {/* Title with logo */}
          <h2 className="d-flex align-items-center">
            Sign into your <Link to='/'><img src={logo} alt='ViewTube' className="img-fluid h2-img" /></Link> account
          </h2>

          {/* Conditional rendering based on whether username is submitted */}
          {!isUsernameSubmitted ? (
            // Username form component
            <UsernameForm
              username={username}
              setUsername={setUsername}
              handleUsernameSubmit={handleUsernameSubmit}
              usernameError={usernameError}
              setUsernameError={setUsernameError}
            />
          ) : (
            // Password form component
            <PasswordForm
              password={password}
              setPassword={setPassword}
              handlePasswordSubmit={handlePasswordSubmit}
              clearPasswordError={clearPasswordError}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
          )}

          {/* Link to register */}
          <br />
          <label htmlFor="member" className="form-label">New here?</label>
          <br />
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
