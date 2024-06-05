import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Login.css';
import './Register.css'
import NewUsernameForm from '../components/RegisterComponents/NewUsernameForm';
import NewNameForm from '../components/RegisterComponents/NewNameForm';
import NewPasswordForm from '../components/RegisterComponents/NewPasswordForm';
import NewImageForm from '../components/RegisterComponents/NewImageForm';
import logo from '../assets/logo.png';
import UploaderDetails from '../components/videoWatchPage/UploaderDetails';
import { useUser } from '../contexts/UserContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  const validateUsername = (username) => {
    const hasUpperCase = /[A-Z]/.test(username);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username);
    const isValidLength = username.length >= 2;

    return !(hasUpperCase || hasSpecialChar || !isValidLength); // Return false if invalid
  };

  const validateName = (firstName, lastName) => {
    const firstNameHasNumber = /\d/.test(firstName);
    const firstNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(firstName);
    const firstNameValidLength = firstName.length >= 2;

    const lastNameHasNumber = /\d/.test(lastName);
    const lastNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(lastName);
    const lastNameValidLength = lastName.length >= 2;

    return !(firstNameHasNumber || firstNameHasSpecialChar || !firstNameValidLength || lastNameHasNumber || lastNameHasSpecialChar || !lastNameValidLength);
  };

  const handlePasswordSubmit = () => {
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

  const handleUsernameSubmit = () => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username)
    if (user) {
      setUsernameError('Username already exists!');
      return false;
    } else if (!validateUsername(username)) {
      setUsernameError('Username can only contain lowercase letters!');
      return false;
    } else if (!validateName(firstName, lastName)) {
      setNameError('Name validation failed!');
      return false;
    } else {
      setUsernameError('');
      setNameError('');
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleUsernameSubmit() && handlePasswordSubmit()) {
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      const newUser = { username, firstName, lastName, password, image };
      users.push(newUser);
      sessionStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      alert(`User registered successfully!\nUsername: ${username}\nFirst Name: ${firstName}\nLast Name: ${lastName}`);
      navigate('/');
    }
  };

  return (
    <div className='login-page'>
      <div className="register-page">
        <div className="login-container">
          <h2 className="d-flex align-items-center">
            Create a <Link to='/'><img src={logo} alt='ViewTube' className="img-fluid h2-img" /></Link> account
          </h2>
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
              nameError={nameError}
              setNameError={setNameError}
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
              setImage={setImage}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
            />
            <div id="passwordReq">
              <a className='passwordReq' target="_blank" draggable="false" data-tooltip='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'>
                ???
              </a>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Register</button>
            <br /><br />
            <label htmlFor="member" className="form-label">Already a member?</label>
            <br />
            <Link to="/login">Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
