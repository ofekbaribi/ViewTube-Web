import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Login.css';
import './Register.css'
import NewUsernameForm from '../components/RegisterComponents/NewUsernameForm';
import NewNameForm from '../components/RegisterComponents/NewNameForm';
import NewPasswordForm from '../components/RegisterComponents/NewPasswordForm';
import NewImageForm from '../components/RegisterComponents/NewImageForm';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  const handlePasswordSubmit = (event) => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password does not meet requirement.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleUsernameSubmit = (event) => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username)
    if (user){
      setUsernameError('Username already exist!')
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleUsernameSubmit() && handlePasswordSubmit()) {
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      users.push({ username, firstName, lastName, password, image });
      sessionStorage.setItem('users', JSON.stringify(users));
      alert(`User registered successfully!\nUsername: ${username}\nFirst Name: ${firstName}\nLast Name: ${lastName}`);
    }
  }

  return (
    <div className='login-page'>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          <h2>Create a ViewTube Account</h2>
          <form onSubmit={handleSubmit} className="position-relative">
            <NewUsernameForm
              username={username}
              setUsername={setUsername}
              usernameError={usernameError}
              setUsernameError={setUsernameError}
            />
            <NewNameForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
            />
            <NewPasswordForm
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
            <NewImageForm
              image={image}
              setImage={setImage}
            />
            <div id="passwordReq">
              <a className='passwordReq' target="_blank" draggable="false" data-tooltip='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'>
                ???
              </a>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Register</button>
            <br/><br/>
            <label htmlFor="member" className="form-label">Already a member?</label>
            <br/>
            <Link to="/login">Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
