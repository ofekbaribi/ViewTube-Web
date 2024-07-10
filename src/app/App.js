// src/app/App.js
import './App.css';
import Home from '../pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VideoWatch from '../pages/VideoWatch';
import Upload from '../pages/Upload';
import UserProfile from '../pages/UserProfile';
import HotVideos from '../pages/HotVideos';
import { VideosProvider } from '../contexts/VideosContext';
import { UserProvider } from '../contexts/UserContext';
import { CommentsProvider } from '../contexts/CommentsContext';
import { ThemeProvider } from '../contexts/DarkModeContext';

function App() {
  return (
    <VideosProvider>
      <UserProvider>
        <CommentsProvider>
          <ThemeProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/video/:videoId" element={<VideoWatch/>} />
                  <Route path="/profile/:username" element={<UserProfile/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/upload" element={<Upload/>} />
                  <Route path="/hot" element={<HotVideos/>} />
                  <Route path="/" element={<Home/>} />
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </CommentsProvider>
      </UserProvider>
    </VideosProvider>
  );
}

export default App;
