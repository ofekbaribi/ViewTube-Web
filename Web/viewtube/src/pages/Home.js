import React from 'react';
import VideoList from '../components/homePage/VideoList';
import Navbar from '../components/commonComponents/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <VideoList />
    </div>
  );
};

export default Home;
