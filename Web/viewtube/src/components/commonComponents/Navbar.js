// Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.svg';
import logo from '../../assets/logo.png';
import dark_logo from '../../assets/logo-dark.png';
import upload from '../../assets/upload.svg';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

const Navbar = ({ toggleSidebar, handleSearchInputChange, onSearch, clearSearchQuery }) => {
  const [darkMode, setDarkMode] = useState(false);

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
        <div className='log_reg'>
        <Link to="/login">
            <p className='login-icon'  alt="login">Login</p>
          </Link>
          <Link to="/register">
            <p className='login-icon'  alt="login">Register</p>
          </Link>
        </div>
        <div>
          {/* Dark Mode toggle */}
          <input
            className="dark_mode_input"
            type="checkbox"
            id="darkmode-toggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="dark_mode_label" htmlFor="darkmode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
