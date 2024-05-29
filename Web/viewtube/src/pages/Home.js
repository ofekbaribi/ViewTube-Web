import React from 'react';
import VideoList from '../components/homePage/VideoList';
import styles from './Home.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <h2>Home</h2>
      <VideoList />
    </div>
  );
};

export default Home;