import './App.css';
import Home from '../pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'; // Adjust the import path if necessary
import VideoWatch from '../pages/VideoWatch';
import Upload from '../pages/Upload'; // Import the Upload component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/video/:videoId" element={<VideoWatch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} /> {/* Add the upload route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
