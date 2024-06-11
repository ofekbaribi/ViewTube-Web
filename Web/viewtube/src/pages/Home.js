import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import { useVideos } from '../contexts/VideosContext';

const Home = () => {
    const { videos } = useVideos();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search') || '';
        setSearchQuery(query);
    }, [location.search]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        navigate(`/?search=${query}`);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} handleSearchInputChange={handleSearchInputChange} onSearch={handleSearch} />
            <div className={styles.homePage}>
                <Sidebar isOpen={sidebarOpen} />
                <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <Feed searchQuery={searchQuery} videos={videos} />
                </div>
            </div>
        </>
    );
};

export default Home;