import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';
import UploaderDetails from './UploaderDetails';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';

function VideoOptionsBar({ video }) {
  // Extract author of the video
  const videoUploader = video.uploader;
  const { currentUser, getProfilePicture } = useUser(); // Get current user context and profile picture function
  const { toggleLikeVideo, userLikes } = useVideos(); // Get video context functions
  const [likes, setLikes] = useState(video.likes); // State for like count
  const [hasLiked, setHasLiked] = useState(false); // State to check if user has liked the video
  const [uploaderImage, setUploaderImage] = useState(null); // State for uploader's profile picture
  const location = useLocation(); // Get current URL location
  const currentUrl = window.location.origin + location.pathname + location.search + location.hash; // Construct the full URL of the current page

  useEffect(() => {
    setLikes(video.likes); // Set likes when the component mounts or updates
    if (currentUser) {
      // Check if current user has liked the video
      setHasLiked(userLikes[currentUser.username]?.includes(video.id) || false);
    }
  }, [video.likes, video.id, userLikes, currentUser]); // Dependencies array for useEffect

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const profilePicture = await getProfilePicture(videoUploader);
      setUploaderImage(profilePicture || '/media/lahav.jpg'); // Use the default image if no profile picture is found
    };
    fetchProfilePicture();
  }, [getProfilePicture, videoUploader]);

  const handleDownload = () => {
    const videoUrl = video.videoURL; // Get video URL
    const a = document.createElement('a');
    a.href = videoUrl; // Set URL to the anchor element
    a.download = 'video.mp4'; // Set download attribute
    document.body.appendChild(a);
    a.click(); // Programmatically click the anchor element to start download
    document.body.removeChild(a); // Remove the anchor element from the document
  };

  const handleShare = async () => {
    await navigator.share({
      title: 'Check out this video!',
      text: `Check out this video by ${videoUploader}`,
      url: currentUrl, // Use the constructed current URL
    });
  };

  const handleLikeClick = () => {
    if (currentUser) {
      toggleLikeVideo(currentUser.username, video.id); // Toggle like state for the video
    } else {
      alert('Guests cannot like videos. Please log in to like videos.');
    }
  };

  return (
    <div className="videoOptionsBar">
      <div className="video-uploader">
        <UploaderDetails username={videoUploader} subscribers={video.subscribers} profileImage={uploaderImage} />
      </div>
      <div className="video-subscribe">Subscribe</div>
      <div className="video-likes-dislikes">
        <div className={`video-likes ${hasLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <img src={like_icon} alt="like icon" />
          <span className={`like-text ${hasLiked ? 'liked' : ''}`}>{likes}</span>
        </div>
        <span> | </span>
        <div className="video-dislikes">
          <img src={dislike_icon} alt="dislike icon" className="dislike-image" />
        </div>
      </div>
      <div className="video-share" onClick={handleShare}>
        <img src={share_icon} alt="share icon" className="share-image" /> Share
      </div>
      <div className="video-download" onClick={handleDownload}>
        <img src={download_icon} className="download-image" alt="download icon" /> Download
      </div>
    </div>
  );
}

export default VideoOptionsBar;
