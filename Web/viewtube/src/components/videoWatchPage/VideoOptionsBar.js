import React, { useEffect, useState } from 'react';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';
import UploaderDetails from './UploaderDetails';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';

function VideoOptionsBar({ video }) {
  const { currentUser } = useUser();
  const { toggleLikeVideo, userLikes } = useVideos();
  const [likes, setLikes] = useState(video.likes);
  const [hasLiked, setHasLiked] = useState(false);

  // Update likes and like status when the component mounts or when dependencies change
  useEffect(() => {
    setLikes(video.likes);
    if (currentUser) {
      setHasLiked(userLikes[currentUser.id]?.includes(video.id) || false);
    }
  }, [video.likes, video.id, userLikes, currentUser]);

  // Determine uploader image
  const uploaderImage = video.id <= 10 ? '/media/lahav.jpg' : (currentUser ? currentUser.image : '/media/lahav.jpg');

  // Handle video download
  const handleDownload = () => {
    const videoUrl = video.videoURL;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle video sharing
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this video!',
        text: `Check out this video by ${video.author}`,
        url: video.videoURL,
      });
    } catch (error) {
      console.error('Error sharing the video:', error);
      alert('Failed to share the video.');
    }
  };

  // Handle like button click
  const handleLikeClick = () => {
    if (currentUser) {
      toggleLikeVideo(currentUser.id, video.id);
    } else {
      alert('Guests cannot like videos. Please log in to like videos.');
    }
  };

  return (
    <div className="videoOptionsBar">
      {/* Uploader details section */}
      <div className="video-uploader">
        <UploaderDetails username={video.author} subscribers={video.subscribers} profileImage={uploaderImage} />
      </div>
      <div className="video-subscribe">Subscribe</div>

      {/* Like and dislike section */}
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

      {/* Share and download buttons */}
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
