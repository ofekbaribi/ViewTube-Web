import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import { useVideos } from '../contexts/VideosContext';
import './HotVideos.css';

const HotVideos = () => {
    // State and hooks
    const { fetchHotVideos } = useVideos(); // Accessing videos from context
    const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [hotVideos, setHotVideos] = useState([]); // State for hot videos
    const navigate = useNavigate(); // Navigation hook from react-router-dom
    const location = useLocation(); // Location hook from react-router-dom

    // Effect to update searchQuery state based on URL search parameter
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search') || ''; // Get search query from URL, default to empty string
        setSearchQuery(query); // Update searchQuery state

    }, [location.search]); // Trigger effect when location.search changes

    // Effect to fetch hot videos
    useEffect(() => {
        const fetchHot = async () => {
            const videos = await fetchHotVideos();
            setHotVideos(videos);
        };

        fetchHot();
    }, [fetchHotVideos]);

    // Function to toggle sidebar open/close state
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value); // Update searchQuery state as user types
    };

    // Function to handle search submission
    const handleSearch = (query) => {
        setSearchQuery(query); // Update searchQuery state
        navigate(`/?search=${query}`); // Navigate to URL with updated search query
    };

    return (
        <>
            {/* Navbar component with props */}
            <Navbar toggleSidebar={toggleSidebar} handleSearchInputChange={handleSearchInputChange} onSearch={handleSearch} />

            {/* Main content area */}
            <div className={styles.homePage}>
                {/* Sidebar component with isOpen prop */}
                <Sidebar isOpen={sidebarOpen} />

                {/* Feed component displaying videos */}
                <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <p className='page-title'>Our Hottest Videos!</p>
                    <hr/>
                    <Feed searchQuery={searchQuery} videos={hotVideos} />
                </div>
            </div>
        </>
    );
};

export default HotVideos;
