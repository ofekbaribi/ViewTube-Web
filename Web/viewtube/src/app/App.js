import './App.css';
import Home from '../pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VideoWatch from '../pages/VideoWatch';
import Upload from '../pages/Upload';
import useVideo from '../contexts/VideosContext';
import { UserProvider } from '../contexts/UserContext';
import { CommentsProvider } from '../contexts/CommentsContext';
import { ThemeProvider } from '../contexts/DarkModeContext';


function App() {
  const { videos, addVideo } = useVideo();

  return (
    <UserProvider>
      <CommentsProvider>
        <ThemeProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route 
                  path="/video/:videoId" 
                  element={<VideoWatch videos={videos}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/upload"
                  element={<Upload videos={videos} addVideo={addVideo} />} />
                <Route path="/" element={<Home videos={videos} />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </CommentsProvider>
    </UserProvider>
  );
}

export default App;