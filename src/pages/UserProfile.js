import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import EditOptionsModal from '../components/UserProfileComponents/EditOptionsModal';
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';
import editIcon from '../assets/edit_icon.svg';
import styles from './Home.css';
import './UserProfile.css';
import '../css/bootstrap.min.css';

const UserProfile = () => {
  const { getVideosByUsername } = useVideos();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { getUserData } = useUser();
  const { currentUser } = useUser();
  const decodedUsername = decodeURIComponent(username);
  const [userData, setUserData] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  // Function to show the modal
  const handleShowOptionsModal = () => setShowOptionsModal(true);
  // Function to close the modal
  const handleCloseOptionsModal = () => setShowOptionsModal(false);

  const userVideos = getVideosByUsername(decodedUsername);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(decodedUsername);
      setUserData(data);
    };

    fetchUserData();
  }, [decodedUsername, getUserData]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [location.search]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/?search=${query}`);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} handleSearchInputChange={handleSearchInputChange} onSearch={handleSearch} />
      <div className={styles.homePage}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="d-flex align-items-center user-details">
            <img
              src={userData.image}
              alt="Uploader's profile"
              className="rounded-circle profile-picture"
              width="100"
              height="100"
            />
            <div className="ml-3 user-data">
              <h3 className="mb-0">{userData.firstName} {userData.lastName}</h3>
              <h5 className='mb-0 details'>@{username} • {userVideos.length} videos</h5>
              {currentUser && currentUser.username === username ? (
                <div>
                  <button type="button" className="btn edit-profile-button" onClick={handleShowOptionsModal}>
                    <img src={editIcon} alt='Edit Profile' className='edit-icon' />
                    <span className='btn btn-danger edit-profile-text'>Edit Profile</span>
                  </button>
                </div>
              ): null}
            </div>
          </div>
          <hr />
          <div className="search-result-item">
            <Feed searchQuery={searchQuery} videos={userVideos} />
          </div>
        </div>
      </div>
      <EditOptionsModal show={showOptionsModal} handleClose={handleCloseOptionsModal}/>
            
    </>
  );
};

export default UserProfile;
