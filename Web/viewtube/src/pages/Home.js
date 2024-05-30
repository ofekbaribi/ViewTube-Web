import React from 'react';
import VideoList from '../components/homePage/VideoList';
import Navbar from '../components/commonComponents/Navbar';
<<<<<<< sidebar-branch
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';
=======
import './Home.css';
>>>>>>> main

const Home = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <VideoList />
    </div>
  );
};

export default Home;
