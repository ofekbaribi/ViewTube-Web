import React from "react";
import './Sidebar.css';
import home_icon from '../../assets/home.png'

const Sidebar = () => {
    return (
       <div className='sidebar'>
        <div className='shortcut-links'>
            <div className='side-links'>
                <img src={home_icon}/><p>Home</p>
            </div>
        </div>

       </div>

    )
}
export default Sidebar;