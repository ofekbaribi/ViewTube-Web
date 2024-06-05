import React from 'react';
import './VideoOptionsBar.css';
import like_icon from '../../assets/like.svg';
import dislike_icon from '../../assets/dislike.svg';
import share_icon from '../../assets/share.svg';
import download_icon from '../../assets/download.svg';


function VideoOptionsBar({ video }) {
  return (
<ul className="videoOptionsBar">
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
        <img src={share_icon} alt="share icon" class="share-image"/> Share    
    </div>
    <div className="video-download">
        <img src={download_icon}  alt="download icon" /> Download    
    </div>

</ul>
  );
}

export default VideoOptionsBar;