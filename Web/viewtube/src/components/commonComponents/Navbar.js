// Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.svg';
import logo from '../../assets/logo.png';
import dark_logo from '../../assets/logo-dark.png';
import upload from '../../assets/upload.svg';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import { useUser } from '../../contexts/UserContext';


const Navbar = ({ toggleSidebar, handleSearchInputChange, onSearch, clearSearchQuery }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser } = useUser();
  const { logout }=useUser();
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate('/')
  }

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' src={menu_icon} alt="menu icon" onClick={toggleSidebar} />
        <div className="logo-container">
          <Link to="/" onClick={clearSearchQuery}>
            <img className={`logo`} src={darkMode ? dark_logo : logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className='nav-middle'>
        <SearchBar onChange={handleSearchInputChange} onSearch={onSearch} />
      </div>
      <div className='nav-right flex-div'>
        <div>
          <Link to="/upload">
            <img className='upload-icon' src={upload} alt="upload icon" />
          </Link>
        </div>
        
        {currentUser ? (
            <div className='profile-pic'>
            <Link to="/">
            <img  src={currentUser.image} alt='profile picture' className="rounded-circle" width="40" height="40" />
            </Link>
            <button className='btn btn-primary logout' onClick={handleLogout}>Logout</button>
            </div>
        ): (<div className='log-reg'>
        <Link to="/login">
            <p className='login'  alt="login">Login</p>
          </Link>
          <Link to="/register">
            <p className='register'  alt="register">Register</p>
          </Link>
        </div>)}
        
        <div class="dark-mode-toggle">
         <input
            class="dark-mode-checkbox"
            type="checkbox"
            id="darkmode-toggle"
            checked={darkMode}
            onChange={toggleDarkMode}
        />
        <label class="dark-mode-label" for="darkmode-toggle">
        <span class="dark-mode-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        <span class="dark-mode-slider" ></span>
    </label>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
