import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import EditOptionsModal from '../components/UserProfileComponents/EditOptionsModal';
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';
import editIcon from '../assets/edit_icon.svg';
import './userProfile.css';

const UserProfile = () => {
  const { getVideosByUsername } = useVideos(); // Access getVideosByUsername function from VideosContext
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Navigation hook from React Router
  const location = useLocation(); // Location hook from React Router
  const { username } = useParams(); // Access username parameter from URL
  const { getUserData, currentUser } = useUser(); // Access getUserData function and currentUser from UserContext
  const decodedUsername = decodeURIComponent(username); // Decode username parameter from URL
  const [userData, setUserData] = useState(null); // State for user data
  const [showOptionsModal, setShowOptionsModal] = useState(false); // State for showing edit options modal
  const [userVideos, setUserVideos] = useState([]); // State for user videos

  // Function to show edit options modal
  const handleShowOptionsModal = () => setShowOptionsModal(true);
  
  // Function to close edit options modal
  const handleCloseOptionsModal = () => setShowOptionsModal(false);

  // Effect to fetch user data and user videos on component mount or when username changes
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(decodedUsername); // Fetch user data
      setUserData(data); // Set user data state
    };

    const fetchUserVideos = async () => {
      const videos = await getVideosByUsername(decodedUsername); // Fetch user videos
      setUserVideos(videos); // Set user videos state
    };

    fetchUserData(); // Call fetchUserData function
    fetchUserVideos(); // Call fetchUserVideos function
  }, [decodedUsername, getUserData]); // Dependencies for useEffect

  // Effect to update search query state when location search changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); // Get search parameters from location
    const query = searchParams.get('search') || ''; // Get search query parameter or default to empty string
    setSearchQuery(query); // Set search query state
  }, [location.search]); // Dependency for useEffect

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state with input value
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
    navigate(`/?search=${query}`); // Navigate with search query in URL
  };

  // Render loading message while user data is fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} handleSearchInputChange={handleSearchInputChange} onSearch={handleSearch} />
      <div className={`homePage`}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className={`d-flex align-items-center user-details`}>
            <img
              src={userData.image}
              alt="Uploader's profile"
              className="rounded-circle profilePicture"
            />
            <div className={`ml-3 user-data`}>
              <h3 className="mb-0">{userData.firstName} {userData.lastName}</h3>
              <h5 className='mb-0 details'>@{userData.username} • {userVideos.length} videos</h5>
              {currentUser && currentUser.username === username ? (
                <div className='d-flex'>
                  <button type="button" className="btn edit-profile-button" onClick={handleShowOptionsModal}>
                    <img src={editIcon} alt='Edit Profile' className='edit-icon' />
                    <span className='btn btn-danger edit-profile-text'>Edit Profile</span>
                  </button>
                  <EditOptionsModal show={showOptionsModal} handleClose={handleCloseOptionsModal} />
                </div>
              ): null}
            </div>
          </div>
          <hr />
          <div className={`searchResultItem`}>
            <Feed searchQuery={searchQuery} videos={userVideos} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
