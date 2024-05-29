// src/components/Login.js
import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import './Login.css'; // Ensure this path is correct
import EmailForm from '../components/LoginComponents/EmailForm';
import PasswordForm from '../components/LoginComponents/PasswordForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setEmailError('Please fill out this field.');
    } else {
      setEmailError('');
      setIsEmailSubmitted(true);
    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (validatePassword(password)) {
      alert('Email: ' + email + '\nPassword: ' + password);
      // Proceed with your authentication logic here
    } else {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      setPassword('');
    }
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
        {!isEmailSubmitted ? (
          <EmailForm
            email={email}
            setEmail={setEmail}
            handleEmailSubmit={handleEmailSubmit}
            emailError={emailError}
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
