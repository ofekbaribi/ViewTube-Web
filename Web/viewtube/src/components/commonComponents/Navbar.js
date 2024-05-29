import React from "react";
import './Navbar.css';
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload from '../../assets/upload.png'

const Navbar = () => {
    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className='menu-icon' src={menu_icon} />
                <img className='logo' src={logo} />
            </div>
            <div className='nav-middle'>
                <div className='search-box flex-div'>
                <input type='text' placeholder="Search"></input>
                <img className='search-icon' src={search_icon}/>
                </div>
            </div>
            <div className='nav-right flex-div'>
                <img className='upload-icon' src={upload}/>

            </div>

        </nav>

    )
}
export default Navbar;