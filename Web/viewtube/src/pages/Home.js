import React, { useState } from 'react';
import VideoList from '../components/homePage/VideoList';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div><Navbar toggleSidebar={toggleSidebar} /></div>
            <div className={styles.homePage}>
                <Sidebar isOpen={sidebarOpen} />
                <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    {/* Main content goes here */}
                </div>
            </div>
            <div><VideoList/></div>
        </>
    );
};

export default Home;
