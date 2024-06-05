import React, { useRef } from 'react';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';
import UploaderDetails from './UploaderDetails';

function VideoOptionsBar({ video }) {
  const videoUplaoder = video.author;
  const users = JSON.parse(sessionStorage.getItem('users')) || [];
  const videoRef = useRef(null);
  
  let uploaderImage;
  if (video.id <= 10) {
    uploaderImage = ('/media/lahav.jpg');
  } else {
    const user = users.find(user => user.username === video.author);
    uploaderImage = user ? user.profilePicture : '/media/lahav.jpg'; // Fallback to a default profile picture if user is not found
  }

  const handleDownload = () => {
    const videoUrl = video.videoURL;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
        await navigator.share({
          title: 'Check out this video!',
          text: `Check out this video by ${videoUplaoder}`,
          url: video.videoURL,
        });
  };

  return (
    <div className="videoOptionsBar">
      <div className="video-uploader">
      <UploaderDetails username={videoUplaoder} subscribers={video.subscribers} profileImage={uploaderImage} />
      </div>
      <div className="video-subscribe">Subscribe</div>
      <div className="video-likes-dislikes">
        <div className="video-likes">
          <img src={like_icon} alt="like icon" />
          <text className="like-text">{video.likes}</text>
        </div>
        <text> | </text>
        <div className="video-dislikes">
          <img src={dislike_icon} alt="dislike icon" className="dislike-image" />
        </div>
      </div>
      <div className="video-share" onClick={handleShare}>
        <img src={share_icon} alt="share icon" className="share-image"/> Share    
      </div>
      <div className="video-download" onClick={handleDownload}>
        <img src={download_icon} alt="download icon"  /> Download    
      </div>
    </div>
  );
}

export default VideoOptionsBar;
