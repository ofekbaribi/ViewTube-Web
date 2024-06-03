import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import './Login.css'; // Assuming you want to reuse some styles from Login.css
import NewUsernameForm from '../components/RegisterComponents/NewUsernameForm';
import NewNameForm from '../components/RegisterComponents/NewNameForm';
import NewPasswordForm from '../components/RegisterComponents/NewPasswordForm';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      setError('Username is required.');
    } else {
      setError('');
      setIsUsernameSubmitted(true);
    }
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (!firstName) {
      setError('First name is required.');
    } else {
      setError('');
      setIsNameSubmitted(true);
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
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!validatePassword(password)) {
      setError('Password does not meet requirement.');
    } else {
      setError('');
      alert(`User registered successfully!\nUsername: ${username}\nFirst Name: ${firstName}\nLast Name: ${lastName}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container">
        <h2>Create a ViewTube Account</h2>
        {!isUsernameSubmitted ? (
          <NewUsernameForm
            username={username}
            setUsername={setUsername}
            handleUsernameSubmit={handleUsernameSubmit}
            error={error}
          />
        ) : !isNameSubmitted ? (
          <NewNameForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            handleNameSubmit={handleNameSubmit}
            error={error}
          />
        ) : (
          <NewPasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handlePasswordSubmit={handlePasswordSubmit}
            error={error}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
