import React from 'react';
import VideoList from '../components/homePage/VideoList';
import Navbar from '../components/commonComponents/Navbar';
import styles from './Home.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Navbar />
      <VideoList />
    </div>
  );
};

export default Home;
