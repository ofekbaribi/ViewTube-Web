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
    <UserProvider> {/* Wrap the UserProvider around the VideosProvider */}
      <VideosProvider> {/* Wrap the entire application with VideosProvider */}
        <CommentsProvider> {/* Wrap the CommentsProvider around the UserProvider */}
          <ThemeProvider> {/* Wrap the ThemeProvider around the CommentsProvider */}
            <Router> {/* Set up routing using BrowserRouter */}
              <div className="App"> {/* Main container for the application */}
                <Routes> {/* Define the routes for different pages */}
                  <Route path="/:username/video/:videoId" element={<VideoWatch/>} /> {/* Route for watching a specific video */}
                  <Route path="/profile/:username" element={<UserProfile/>} /> {/* Route for user profile page */}
                  <Route path="/login" element={<Login />} /> {/* Route for login page */}
                  <Route path="/register" element={<Register />} /> {/* Route for register page */}
                  <Route path="/upload" element={<Upload/>} /> {/* Route for video upload page */}
                  <Route path="/hot" element={<HotVideos/>} /> {/* Route for hot videos page */}
                  <Route path="/" element={<Home/>} /> {/* Default route for home page */}
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </CommentsProvider>
      </VideosProvider>
    </UserProvider>

  );
}

export default App;
