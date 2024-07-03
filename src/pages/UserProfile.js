import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import { useVideos } from '../contexts/VideosContext';
import styles from './Home.css';
import { useUser } from '../contexts/UserContext';
import './UserProfile.css';
import '../css/bootstrap.min.css';

const UserProfile = () => {
  // State and hooks
  const { getVideosByUsername } = useVideos(); // Accessing the getVideosByUsername function from context
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Navigation hook from react-router-dom
  const location = useLocation(); // Location hook from react-router-dom
  const { username } = useParams(); // Getting Username from URL params
  const { getUserData } = useUser();
  const decodedUsername = decodeURIComponent(username);
  const [userData, setUserData] = useState(null); // State for user data

  // Get videos uploaded by the user
  const userVideos = getVideosByUsername(decodedUsername);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(decodedUsername);
      setUserData(data);
    };

    fetchUserData();
  }, [decodedUsername, getUserData]);

  // Effect to update searchQuery state based on URL search parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || ''; // Get search query from URL, default to empty string
    setSearchQuery(query); // Update searchQuery state
  }, [location.search]); // Trigger effect when location.search changes

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

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

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
            <div className="d-flex align-items-center user-details">
                {/* Profile Image */}
                <img
                    src={userData.image}
                    alt="Uploader's profile"
                    className="rounded-circle profile-picture"
                    width="100"
                    height="100"
                />
                {/* Uploader's Details */}
                <div className="ml-3 user-data">
                    <h3 className="mb-0">{userData.firstName} {userData.lastName}</h3>
                    <h5 className='mb-0 details'>@{username} • {userVideos.length} videos</h5>
                </div>
            </div>
            <hr/>
            <div className="search-result-item">
                <Feed searchQuery={searchQuery} videos={userVideos} />
            </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
