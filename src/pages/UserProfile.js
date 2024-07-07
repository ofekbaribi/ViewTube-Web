import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import Feed from '../components/commonComponents/Feed';
import EditOptionsModal from '../components/UserProfileComponents/EditOptionsModal';
import DeleteUserModal from '../components/UserProfileComponents/DeleteUserModal'; // Import the new component
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';
import editIcon from '../assets/edit_icon.svg';
import deleteIcon from '../assets/delete_icon.svg'; // Add an icon for delete button
import homeStyles from './Home.css';
import styles from './UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
  const { getVideosByUsername } = useVideos();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { getUserData, currentUser } = useUser();
  const decodedUsername = decodeURIComponent(username);
  const [userData, setUserData] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const handleShowOptionsModal = () => setShowOptionsModal(true);
  const handleCloseOptionsModal = () => setShowOptionsModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

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
      <div className={`homePage`}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className={`d-flex align-items-center userDetails`}>
            <img
              src={userData.image}
              alt="Uploader's profile"
              className={`rounded-circle profilePicture`}
            />
            <div className={`ml-3 userData`}>
              <h3 className="mb-0">{userData.firstName} {userData.lastName}</h3>
              <h5 className={`mb-0 details`}>@{username} • {userVideos.length} videos</h5>
            </div>
            {currentUser && currentUser.username === username ? (
              <div className="d-flex">
                <button type="button" className={`editProfileButton`} onClick={handleShowOptionsModal}>
                  <img src={editIcon} alt='Edit Profile' className={`editIcon`} />
                </button>
                <button type="button" className={`deleteProfileButton`} onClick={handleShowDeleteModal}>
                  <img src={deleteIcon} alt='Delete Profile' className={`deleteIcon`} />
                </button>
              </div>
            ) : null}
          </div>
          <hr />
          <div className={`searchResultItem`}>
            <Feed searchQuery={searchQuery} videos={userVideos} />
          </div>
        </div>
      </div>
      <EditOptionsModal show={showOptionsModal} handleClose={handleCloseOptionsModal} />
      <DeleteUserModal show={showDeleteModal} handleClose={handleCloseDeleteModal} />
    </>
  );
};

export default UserProfile;
