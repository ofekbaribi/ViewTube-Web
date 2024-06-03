import React, { useState } from 'react';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const clearSearchQuery = () => {
        setSearchQuery('');
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} handleSearchInputChange={handleSearchInputChange} onSearch={handleSearch} clearSearchQuery={clearSearchQuery} />
            <div className={styles.homePage}>
                <Sidebar isOpen={sidebarOpen} />
                <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <Feed searchQuery={searchQuery} />
                </div>
            </div>
        </>
    );
};

export default Home;
