import React from 'react';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';
import UploaderDetails from './UploaderDetails';

function VideoOptionsBar({ video }) {
  const videoUplaoder = video.author;
  const users = JSON.parse(sessionStorage.getItem('users')) || [];
  
  let uploaderImage;
  if (video.id <= 10) {
    uploaderImage = ('/media/lahav.jpg');
  } else {
    const user = users.find(user => user.username === video.author);
    uploaderImage = user ? user.profilePicture : '/media/lahav.jpg'; // Fallback to a default profile picture if user is not found
  }

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
      <div className="video-share">
        <img src={share_icon} alt="share icon" className="share-image"/> Share    
      </div>
      <div className="video-download">
        <img src={download_icon} alt="download icon" /> Download    
      </div>
    </div>
  );
}

export default VideoOptionsBar;
