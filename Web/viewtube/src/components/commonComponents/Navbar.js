import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import upload from '../../assets/upload.png';
import darkModeIcon from '../../assets/dark-mode.svg'; // Add dark mode icon
import lightModeIcon from '../../assets/light-mode.svg'; // Add light mode icon
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

const Navbar = ({ toggleSidebar, handleSearchInputChange, onSearch, clearSearchQuery }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Additional logic to toggle dark mode styles
  };

  return (
    <nav className={`flex-div ${darkMode ? 'navbar-dark' : 'navbar-light'}`}>
      <div className='nav-left flex-div'>
        <img className='menu-icon' src={menu_icon} alt="menu icon" onClick={toggleSidebar} />
        <div className="logo-container">
          <Link to="/" onClick={clearSearchQuery}>
            <img className='logo' src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className='nav-middle'>
        <SearchBar onChange={handleSearchInputChange} onSearch={onSearch} />
      </div>
      <div className='nav-right flex-div'>
        <button onClick={toggleDarkMode}>
          <img className='dark-mode-icon' src={darkMode ? lightModeIcon : darkModeIcon} alt="dark mode toggle" />
        </button>
        <Link to="/upload">
          <img className='upload-icon' src={upload} alt="upload icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
