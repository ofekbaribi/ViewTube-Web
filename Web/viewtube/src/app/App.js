import './App.css';
import Home from '../pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'; // Adjust the import path if necessary
import VideoWatch from '../pages/VideoWatch'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/videoWatch" element={<VideoWatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
