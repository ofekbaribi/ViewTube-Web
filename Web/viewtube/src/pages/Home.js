import React from 'react';
import VideoList from '../components/homePage/VideoList';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';
import Sidebar from '../components/commonComponents/Sidebar';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Navbar />
      <Sidebar />
      <VideoList />
    </div>
  );
};

export default Home;
