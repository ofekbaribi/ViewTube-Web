import React from "react";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import home_icon from '../../assets/home.svg';

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className='shortcut-links'>
                <div className='side-links'>

                    <Link to="/" className="no-link-style">
                        <img src={home_icon} alt="home icon" className="icon" /><p>Home</p>
                    </Link>
                </div>
                {/* Add more links as needed */}

                    <img src={home_icon} alt="home icon"/><p>Home</p>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
