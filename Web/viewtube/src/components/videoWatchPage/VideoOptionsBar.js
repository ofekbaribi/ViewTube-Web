import React, { useEffect, useRef, useState } from 'react';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';
import UploaderDetails from './UploaderDetails';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';

function VideoOptionsBar({ video }) {
  const videoUploader = video.author;
  const videoRef = useRef(null);
  const { currentUser } = useUser();
  const { toggleLikeVideo, userLikes } = useVideos();
  const [likes, setLikes] = useState(video.likes);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setLikes(video.likes);
    if (currentUser) {
      setHasLiked(userLikes[currentUser.id]?.includes(video.id) || false);
    }
  }, [video.likes, video.id, userLikes, currentUser]);

  let uploaderImage;
  if (video.id <= 10) {
    uploaderImage = '/media/lahav.jpg';
  } else {
    uploaderImage = currentUser ? currentUser.image : '/media/lahav.jpg'; // Fallback to a default profile picture if user is not found
  }

  const handleDownload = () => {
    const videoUrl = video.videoURL;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    await navigator.share({
      title: 'Check out this video!',
      text: `Check out this video by ${videoUploader}`,
      url: video.videoURL,
    });
  };

  const handleLikeClick = () => {
    if (currentUser) {
      toggleLikeVideo(currentUser.id, video.id);
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
