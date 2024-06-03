import React from "react";
import './Sidebar.css';
import home_icon from '../../assets/home.svg';

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className='shortcut-links'>
                <div className='side-links'>
                    <img src={home_icon} alt="home icon"/><p>Home</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
